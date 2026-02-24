"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface WPTypeColumn {
  slug: string;
  label: string;
}

interface ComparisonRow {
  label: string;
  values: string[];
}

interface ComparisonTableProps {
  types: WPTypeColumn[];
  rows: ComparisonRow[];
}

export function ComparisonTable({ types, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <motion.tr
            className="border-b border-border"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <th className="py-3 px-4 text-left font-semibold text-foreground" />
            {types.map((type, i) => (
              <motion.th
                key={type.slug}
                className="py-3 px-4 text-left font-semibold text-foreground"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.1 * (i + 1), ease: "easeOut" }}
              >
                <Link href={`/waermepumpen/${type.slug}`} className="hover:text-primary transition-colors">
                  {type.label}
                </Link>
              </motion.th>
            ))}
          </motion.tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <motion.tr
              key={row.label}
              className="transition-colors hover:bg-primary-50/50"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: 0.08 * i, ease: "easeOut" }}
            >
              <td className="py-3 px-4 font-medium text-foreground">{row.label}</td>
              {row.values.map((val, j) => (
                <td key={j} className="py-3 px-4 text-muted-foreground">{val}</td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
