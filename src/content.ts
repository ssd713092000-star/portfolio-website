// All the words on the site live in this file.
// To update the portfolio, edit the text between the quotes and redeploy.

export interface Link {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  kicker: string;
  problem: string;
  built: string;
  result: { figure: string; label: string }[];
  stack: string[];
  link?: string;
}

export interface Role {
  title: string;
  period: string;
  points: string[];
}

export const profile = {
  firstName: "Swayam",
  middleName: "Sampad",
  lastName: "Das",
  role: "Data Engineer · Agentic AI",
  location: "Bangalore, India",
  timezone: "Asia/Kolkata",
  email: "s3091990@gmail.com",
  phone: "+91 93111 47087",
  availability: "Immediate joiner",
  openTo: [
    {
      kind: "Full-time",
      detail: "Data Engineer or AI Engineer roles. Available to join immediately, based in Bangalore.",
    },
    {
      kind: "Freelance",
      detail: "Scoped projects: data pipelines, lakehouse builds, BigQuery and Airflow work, and agentic AI tools.",
    },
  ],
  intro:
    "I build the quiet machinery behind payments: pipelines, lakehouses and reconciliation systems that keep money moving correctly for banks and agent networks across India.",
  about: [
    "For 4.5 years I've worked where data engineering meets FinTech. At iServeU I work on the data behind AEPS, UPI, MATM and BBPS: settlements, mismatches and the thousands of reports that finance teams wake up to every morning.",
    "I care about pipelines that fail loudly and recover on their own, about SQL that a teammate can read a year later, and about rewriting a pipeline until it runs four times faster than the one it replaced.",
    "Lately much of my work is agentic AI: MCP servers that give AI assistants access to our engineering tools, RAG over internal docs, and LangGraph pipelines that keep a human in the loop. I'm open to Data Engineer and AI Engineer roles, and to freelance projects.",
  ],
  resume: "/Swayam_Sampad_Das_Resume_Data_Engineer_GCP.pdf",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/swayamsampad-das-b0aa9090" },
    { label: "GitHub", href: "https://github.com/ssd713092000-star" },
  ] as Link[],
};

export const stats = [
  { figure: "4.5", unit: "yrs", label: "building data platforms" },
  { figure: "1000", unit: "+", label: "reports orchestrated daily" },
  { figure: "4", unit: "×", label: "faster reconciliation pipelines" },
  { figure: "100", unit: "+", label: "Looker dashboards for finance" },
];

export const projects: Project[] = [
  {
    title: "Iceberg Medallion on GCP",
    kicker: "Side project · lakehouse",
    problem:
      "How do you run a full bronze → silver → gold lakehouse on open table formats, with real quality gates and BI on top, instead of a demo that stops at bronze?",
    built:
      "An end-to-end e-commerce lakehouse: raw Parquet lands in GCS, a Dataproc Jupyter notebook loads Iceberg bronze, and Cloud Composer runs Serverless Spark for SCD2 silver dimensions and nine gold marts, each layer behind a data-quality gate with quarantine. Gold is served to BigQuery and Looker.",
    result: [
      { figure: "397K", label: "order lines modelled" },
      { figure: "9", label: "gold marts, rebuilt atomically" },
    ],
    stack: ["Apache Iceberg", "Dataproc", "Cloud Composer", "Serverless Spark", "BigQuery"],
    link: "https://github.com/ssd713092000-star/gcp-iceberg-medallion",
  },
  {
    title: "Tube2Dev",
    kicker: "Side project · applied AI",
    problem:
      "Turning a technical video into a good article takes hours, and an LLM draft can't be trusted to stay faithful to what was actually said.",
    built:
      "A LangGraph pipeline that cleans the transcript, plans an outline, writes sections in parallel, then fact-checks every key claim against the transcript and revises until it holds up. It pauses for a human to approve before publishing to dev.to. FastAPI and Next.js 15 on Cloud Run, with Cloud Tasks, Cloud SQL and KMS-encrypted user keys.",
    result: [
      { figure: "2", label: "human checkpoints before publishing" },
      { figure: "0", label: "service-account key files: ADC only" },
    ],
    stack: ["LangGraph", "FastAPI", "Next.js 15", "Cloud Run", "Cloud SQL", "Cloud KMS"],
    link: "https://github.com/ssd713092000-star/youtube-to-blog",
  },
  {
    title: "The Lakehouse Move",
    kicker: "Platform migration",
    problem:
      "Multi-product payment reconciliation ran as PySpark batch jobs on Azure Databricks, and both cost and processing windows kept growing.",
    built:
      "Led the move to an on-prem Apache Iceberg lakehouse with Spark for compute, Trino for SQL and Nessie for versioned catalogs. GCS Parquet loads straight into Iceberg tables.",
    result: [
      { figure: "30%", label: "less processing time" },
      { figure: "25%", label: "better system performance" },
    ],
    stack: ["Apache Iceberg", "Spark", "Trino", "Nessie", "Azure Databricks"],
  },
  {
    title: "ReconHub",
    kicker: "Product · architecture",
    problem:
      "Every payment product (AEPS, UPI, MATM) reconciled differently, with hand-tuned Pandas scripts and no shared view of mismatches.",
    built:
      "Designed a config-driven reconciliation platform: Next.js 14 front end, FastAPI back end and Polars pipelines, with a ClickHouse reporting layer (ReplacingMergeTree, partitioned by recon date and cycle) for real-time mismatch analytics.",
    result: [
      { figure: "4×", label: "faster than the Pandas version" },
      { figure: "3", label: "payment products on one engine" },
    ],
    stack: ["Polars", "FastAPI", "ClickHouse", "Next.js 14", "React"],
  },
  {
    title: "A Factory for DAGs",
    kicker: "Orchestration",
    problem:
      "Over a thousand BigQuery reports had to land every day, on cycle-aware schedules across IST and UTC, without anyone babysitting them.",
    built:
      "An Airflow DAG factory: drop in a SQL file and a DAG registers itself, then runs on its settlement cycle and delivers to GCS. Commission reconciliation resumes from checkpoints in PostgreSQL and Redis, with GCS Parquet caches for fault tolerance.",
    result: [
      { figure: "1000+", label: "daily reports" },
      { figure: "60%", label: "less reconciliation time" },
    ],
    stack: ["Apache Airflow", "BigQuery", "GCS", "PostgreSQL", "Redis"],
  },
  {
    title: "Events, in Real Time",
    kicker: "Streaming ingestion",
    problem:
      "Transaction events from Pub/Sub had to reach the warehouse instantly, and a single malformed event could stall the whole stream.",
    built:
      "Rewrote the Node.js consumer in Go with automatic schema alignment and dead-letter handling, then moved to Dataflow streaming into Iceberg tables on BigLake, so the same data can be queried from both BigQuery and Spark on Dataproc.",
    result: [
      { figure: "DLQ", label: "bad events set aside, never blocking" },
      { figure: "50%", label: "faster SFTP → GCS uploads" },
    ],
    stack: ["Pub/Sub", "Go", "Dataflow", "BigLake", "Dataproc"],
  },
  {
    title: "Agents for Engineers",
    kicker: "Agentic AI · at iServeU",
    problem:
      "Engineers lost hours moving between Jira tickets, GitLab merge requests and scattered engineering docs just to get the context for a change.",
    built:
      "Jira and GitLab MCP servers that give AI assistants structured access to the team's tickets and repositories, plus a RAG assistant over the engineering docs built with LangChain and a Qdrant vector store.",
    result: [
      { figure: "20%", label: "less development time" },
      { figure: "2", label: "MCP servers: Jira and GitLab" },
    ],
    stack: ["MCP", "LangChain", "RAG", "Qdrant", "Python"],
  },
  {
    title: "Queries & Machines",
    kicker: "APIs · applied ML",
    problem:
      "Internal teams waited on slow ad-hoc queries, and KYC documents and suspicious transactions were reviewed by hand.",
    built:
      "A Trino-based query management API, plus KYC document OCR and transaction fraud detection on Vertex AI. I later moved OCR from the GCP Vision API to AWS Textract.",
    result: [
      { figure: "45%", label: "faster query execution" },
      { figure: "20%", label: "better OCR accuracy, 35% lower cost" },
    ],
    stack: ["Trino", "Vertex AI", "AWS Textract", "GCP Vision API"],
  },
];

export const company = {
  name: "iServeU",
  blurb: "Payment infrastructure (AEPS, UPI, MATM, BBPS) for banks and agent networks across India.",
};

export const roles: Role[] = [
  {
    title: "Software Engineer 2 · Python Team Lead",
    period: "May 2024 — Oct 2026",
    points: [
      "Ran the batch data platform on Azure Databricks, then led its migration to an Iceberg lakehouse (−30% processing time).",
      "Designed Azure Data Factory ingestion for the planned BigQuery → Databricks migration, mapping 1000+ daily reports.",
      "Built real-time Pub/Sub → BigQuery ingestion in Node.js and Go, then Dataflow streaming into Iceberg on BigLake.",
      "Built 100+ Looker dashboards giving finance self-serve views of settlements and mismatches.",
      "Led a team of Python engineers through design reviews, code reviews and mentoring (+20% productivity, −25% deployment errors).",
    ],
  },
  {
    title: "Software Engineer",
    period: "May 2023 — May 2024",
    points: [
      "Automated AEPS/UPI/MATM reconciliation with PySpark, Pandas and NumPy (−60% time, +25% accuracy).",
      "Designed the Airflow DAG factory behind 1000+ daily BigQuery reports.",
      "Built Flask/FastAPI clearing-automation APIs (−45% processing time) and KYC OCR (+70% faster processing).",
    ],
  },
  {
    title: "Associate Software Engineer · Trainee",
    period: "Feb 2022 — May 2023",
    points: [
      "Built Jenkins CI/CD for Cloud Run and VMs; containerised Go, Java, Node.js and Tomcat services.",
      "Wrote Terraform and Ansible for repeatable provisioning; ran log pipelines into ELK.",
    ],
  },
];

export const toolkit: { group: string; items: string[] }[] = [
  {
    group: "Data engineering",
    items: ["PySpark", "Apache Airflow", "Apache Iceberg", "Trino", "Azure Data Factory", "Polars", "Pandas", "ETL / ELT", "Data quality"],
  },
  {
    group: "Warehouses & stores",
    items: ["BigQuery", "ClickHouse", "PostgreSQL", "Redis", "Cassandra", "Snowflake (learning)"],
  },
  {
    group: "Cloud",
    items: ["GCP: BigLake, Dataproc, Dataflow, Pub/Sub, GCS, Looker, Vertex AI", "Azure: Databricks, ADF", "AWS: Textract"],
  },
  { group: "Languages", items: ["Python", "SQL", "Go", "TypeScript", "Bash"] },
  { group: "Full stack", items: ["FastAPI", "Flask", "Next.js 14", "React", "Node.js", "tRPC"] },
  {
    group: "Agentic AI",
    items: ["LangGraph", "LangChain", "MCP servers", "RAG", "Qdrant", "Vertex AI", "Human-in-the-loop review"],
  },
  { group: "DevOps", items: ["Docker", "Terraform", "Jenkins", "Git / GitLab", "Cloud Build", "Kubernetes (basics)"] },
];

export const education = {
  degree: "B.Tech, Electrical & Electronics Engineering",
  school: "Veer Surendra Sai University of Technology (VSSUT), Burla",
  years: "2018 — 2022",
  certs: [
    "ML & AI Foundations",
    "Advanced Predictive Modeling",
    "Intro to TensorFlow",
    "Structuring ML Projects",
  ],
  certIssuer: "Coursera / DeepLearning.AI",
};
