export const metadata = {
    title: "Team",
  };
  
  export default function TeamPage() {
    return (
      <section className="relative px-6 py-10 lg:px-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold leading-tight text-brand-dark md:text-3xl">
            <span className="text-brand-green">Team</span> Management
          </h1>
  
          <div className="mt-3 flex items-center" aria-hidden="true">
            <span className="text-base leading-none text-brand-green">◆</span>
            <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
          </div>
  
          <p className="mt-3 text-sm text-brand-gray">
            Manage your team members and their roles here.
          </p>
        </div>
  
        <div className="rounded-2xl border border-dashed border-brand-border bg-white p-10 text-center">
          <p className="text-brand-gray">
            Team management tools are coming soon.
          </p>
        </div>
      </section>
    );
  }