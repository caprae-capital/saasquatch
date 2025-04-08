class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate, except: [:signup, :login, :logout]

  def signup
    user = User.create!(first_name: params[:firstName], last_name: params[:lastName], email: params[:email], password: params[:password])

    customer = Stripe::Customer.create(email: user.email)
    user.update!(stripe_customer_id: customer.id)

    user_session = user.user_sessions.create!(user:, token: SecureRandom.uuid, expires_at: 1.day.from_now)
    session[:token] = user_session.token
    render json: { result: "success" }
  rescue StandardError => e
    render json: { result: "error", message: e.message }
  end

  def plan_type
    @current_user.update!(plan_type: params[:planType])
    render json: { result: "success" }
  rescue StandardError => e
    render json: { result: "error", message: e.message }
  end

  def purchase
    payment_method = Stripe::PaymentMethod.attach(
      params[:payment_method_id],
      { customer: @current_user.stripe_customer_id }
    )

    Stripe::Customer.update(
      @current_user.stripe_customer_id,
      invoice_settings: { default_payment_method: payment_method.id }
    )

    @current_user.update!(default_card_id: payment_method.id)

    price = Stripe::Price.retrieve(@current_user.plan.stripe_price_id)

    Stripe::PaymentIntent.create({
                                   amount: price.unit_amount,
                                   currency: price.currency,
                                   customer: @current_user.stripe_customer_id,
                                   payment_method: @current_user.default_card_id,
                                   off_session: false,
                                   confirm: true,
                                   automatic_payment_methods: {
                                     enabled: true,
                                     allow_redirects: 'never'
                                   }
                                 })

    @current_user.update!(subscription_status: User::ACTIVE_STATUS)
    render json: { result: "success" }
  rescue StandardError => e
    render json: { result: "error", message: e.message }
  end

  def payment
    payment_method = Stripe::PaymentMethod.attach(
      params[:payment_method_id],
      { customer: @current_user.stripe_customer_id }
    )

    Stripe::Customer.update(
      @current_user.stripe_customer_id,
      invoice_settings: { default_payment_method: payment_method.id }
    )

    @current_user.update!(default_card_id: payment_method.id)
    render json: { result: "success" }
  rescue StandardError => e
    render json: { result: "error", message: e.message }
  end

  def update_plan
    plan = Plan.find_by(stripe_plan_id: params[:planType])

    price = Stripe::Price.retrieve(plan.stripe_price_id)

    Stripe::PaymentIntent.create({
                                   amount: price.unit_amount,
                                   currency: price.currency,
                                   customer: @current_user.stripe_customer_id,
                                   payment_method: @current_user.default_card_id,
                                   off_session: false,
                                   confirm: true,
                                   automatic_payment_methods: {
                                     enabled: true,
                                     allow_redirects: 'never'
                                   }
                                 })
    @current_user.update!(plan_type: params[:planType])
    render json: { result: "success" }
  rescue StandardError => e
    render json: { result: "error", message: e.message }
  end

  def get_payment_details
    payment_method = Stripe::PaymentMethod.retrieve(@current_user.default_card_id)
    render json: { result: "success", payment_method: }
  rescue StandardError => e
    render json: { result: "error", message: e.message }
  end

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      expires_at = params[:rememberMe] ? 30.days.from_now : 1.day.from_now
      user_session = user.user_sessions.create!(user:, token: SecureRandom.uuid, expires_at:)
      session[:token] = user_session.token
      render json: { result: "success" }
    else
      raise StandardError.new("Invalid email or password")
    end
  rescue StandardError => e
    render json: { result: "error", message: e.message }
  end

  def logout
    UserSession.find_by(token: session[:token])&.destroy if session[:token].present?
    session[:token] = nil
    @current_user = nil
    render json: { result: "success" }
  end

  def get_current_user
    render json: @current_user.as_json(only: [:id, :first_name, :last_name, :email, :subscription_status, :plan_type])
  end

  def plan
    plan = Plan.find_by(stripe_plan_id: @current_user.plan_type)
    plan.pull_latest_price if plan.present?
    render json: { result: "success", plan: }
  rescue StandardError => e
    render json: { result: "error", message: e.message }
  end

  def plans
    Plan.pull_all_prices
    plans = Plan.visible
    render json: { result: "success", plans: }
  rescue StandardError => e
    render json: { result: "error", message: e.message }
  end

  def password
    if @current_user.authenticate(params[:currentPassword])
      @current_user.update!(password: params[:newPassword])
      render json: { result: "success" }
    else
      raise StandardError.new("Invalid password")
    end
  rescue StandardError => e
    render json: { result: "error", message: e.message }
  end
end
