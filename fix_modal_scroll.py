with open('app/treatment/ClientTreatmentPage.tsx', 'r') as f:
    content = f.read()

# 1. Modal Container
old_modal_container = 'className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-brand-beige overflow-hidden z-10 max-h-[92vh] sm:h-[86vh] flex flex-col md:flex-row"'
new_modal_container = 'className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-brand-beige overflow-y-auto md:overflow-hidden z-10 max-h-[92vh] sm:h-[86vh] flex flex-col md:flex-row"'
content = content.replace(old_modal_container, new_modal_container)

# 2. Left Column
old_left_col = 'className="md:w-5/12 lg:w-4/12 bg-[#FAF8F5] border-b md:border-b-0 md:border-r border-brand-beige/80 flex flex-col shrink-0 overflow-y-auto"'
new_left_col = 'className="md:w-5/12 lg:w-4/12 bg-[#FAF8F5] border-b md:border-b-0 md:border-r border-brand-beige/80 flex flex-col shrink-0 md:overflow-y-auto"'
content = content.replace(old_left_col, new_left_col)

# 3. Right Column Outer
old_right_col_outer = 'className="md:w-7/12 lg:w-8/12 flex-1 flex flex-col bg-white overflow-hidden"'
new_right_col_outer = 'className="md:w-7/12 lg:w-8/12 flex-1 flex flex-col bg-white md:overflow-hidden"'
content = content.replace(old_right_col_outer, new_right_col_outer)

# 4. Right Column Inner
old_right_col_inner = 'className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 sm:space-y-5 bg-white"'
new_right_col_inner = 'className="flex-1 md:overflow-y-auto p-5 sm:p-7 space-y-4 sm:space-y-5 bg-white"'
content = content.replace(old_right_col_inner, new_right_col_inner)

with open('app/treatment/ClientTreatmentPage.tsx', 'w') as f:
    f.write(content)

