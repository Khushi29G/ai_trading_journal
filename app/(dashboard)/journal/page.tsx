import JournalForm from "@/components/journal/journal-form";
import JournalList from "@/components/journal/journal-list";

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Trading Journal
          </h1>

          <p className="text-slate-400 mt-2">
            Record emotions, lessons and improve your trading discipline
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <JournalForm />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <JournalList />
        </div>

      </div>
    </div>
  );
}