import ListingTable from "@/components/ui/ListingTable";

export default function CategoryColumns() {
    return (
      <div className="container max-w-full mx-auto px-2">
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          <ListingTable title="Results" category="latest-jobs"/>
          <ListingTable title="Admit Cards" category="admit_card"/>
          <ListingTable title="Latest Jobs" category="latest-jobs"/>
          <ListingTable title="Answer Key" category="answer-keys"/>
          <ListingTable title="Syllabus" category="syllabus" />
          <ListingTable title="Admission" category="latest-jobs" />
        </div>
      </div>
    );
}
