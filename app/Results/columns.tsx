"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Results = {
    score : string
    corpus_sentence : string
    plagiarism_sentence : string
}

export const columns: ColumnDef<Results>[] = [
  {
    accessorKey: "corpus_sentence",
    header: "Corpus",
  },
  {
    accessorKey: "plagiarism_sentence",
    header: "Plagiasied",
  },
]
