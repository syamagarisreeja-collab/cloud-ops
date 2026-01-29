import React, { useEffect, useState } from "react";
import { getLiveData } from "../api";

const Live: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLiveData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load live data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading live data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Live Fleet Status</h2>

      <pre style={{ background: "#111", padding: "1rem", color: "#0f0" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default Live;
