import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import type { GradingCriteria } from '../types';

export function GradingCriteriaForm() {
  const { register, control, handleSubmit } = useForm<GradingCriteria>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "conditions"
  });

  const onSubmit = (data: GradingCriteria) => {
    console.log(data);
    // TODO: Save criteria to Supabase
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-md shadow-sm border border-emerald-100">
              <Sparkles className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">AI-Powered Lead Grading Rules</h3>
              <p className="text-sm text-gray-500">
                Define your criteria in natural language for AI evaluation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => append({ field: '', value: '' })}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Rule
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="group relative">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-24 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rule Type</label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register(`conditions.${index}.field`)}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 bg-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="e.g., include_industry, exclude_industry"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rule Definition</label>
                    <div className="relative">
                      <textarea
                        {...register(`conditions.${index}.value`)}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="e.g., 'Include companies in SaaS, AI, or Enterprise Software industries'"
                        rows={2}
                      />
                      <div className="absolute right-2 top-2">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {fields.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <Sparkles className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-gray-900">No rules defined yet</h3>
              <p className="text-sm text-gray-500 mt-1">Add your first rule to start grading leads</p>
              <button
                type="button"
                onClick={() => append({ field: '', value: '' })}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Add First Rule
              </button>
            </div>
          )}
        </div>
      </div>

      {fields.length > 0 && (
        <button
          type="submit"
          className="w-full rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-white hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-md"
        >
          Save Rules
        </button>
      )}
    </form>
  );
}