import { useParams } from "react-router-dom";

function CompanyLedger() {
  const { company, type } = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold">
        {company}
      </h1>

      <p className="text-gray-400">
        {type} Ledger
      </p>
    </div>
  );
}

export default CompanyLedger;