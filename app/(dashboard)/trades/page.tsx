import AddTradeForm from "@/components/trades/add-trade-form";
import TradesTable from "@/components/trades/trades-table";
import CsvImport from "@/components/trades/csv-import";

export default function TradesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Trade Management
          </h1>

          <p className="text-slate-400 mt-2">
            Manage, import and analyze your trades
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <CsvImport />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <AddTradeForm />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <TradesTable />
        </div>

      </div>
    </div>
  );
}