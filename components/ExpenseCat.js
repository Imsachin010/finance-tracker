import {currencyFormatter} from "@/lib/utils";

function ExpenseCat({title,color,amount}) {
    return (
        // Expense category component
        <div className="flex item-center px-4 py-4 bg-slate-800 rounded-full justify-between">
          <div className="flex item-center gap-2">
            <div className="w-[20px] h-[20px] rounded-full" style={{backgroundColor: color}}/>
            <h4  className="capitalize">{title}</h4>
          </div>
          <p>{currencyFormatter(amount)}</p>
        </div>
    )
}

export default ExpenseCat;