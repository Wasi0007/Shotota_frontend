'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DataTable } from '@/components/ui/data-table';
import { columns } from './Results/columns';

type ResultItem = {
  score: string;
  corpus_sentence: string;
  plagiarism_sentence: string;
};

type ResultType = ResultItem[];

export default function Home() {
  const [corpusText, setCorpusText] = useState("");
  const [plagiarisedText, setPlagiarisedText] = useState("");
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleCorpusTextChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCorpusText(e.target.value);
  };

  const handlePlagiarisedTextChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPlagiarisedText(e.target.value);
  };

  const isSubmitDisabled = () => {
    const corpusWordCount = countWords(corpusText);
    const plagiarisedWordCount = countWords(plagiarisedText);
    
    if (corpusWordCount === 0 || plagiarisedWordCount === 0 ||
        corpusWordCount >= 500 || plagiarisedWordCount >= 500) {
      return true;
    }

    return false;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = {
        "corpus_text": corpusText,
        "plagiarised_text": plagiarisedText
      };
    
      const response = await fetch('http://localhost:8000/api/check_plagiarism/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
    
      const responseData = await response.json();
      setResult(responseData);
    } catch (fetchError) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="px-10 py-5 grid lg:grid-cols-2 md:grid-cols-2 gap-12">
        <div className="sm:w-full md:w-45vw lg:w-45vw" style={{ height: '70vh', margin: '10px'}}>
          <Textarea
            className="h-full text-2xl resize-none"
            placeholder="Enter Your Corpus Text Here..."
            value={corpusText}
            onChange={handleCorpusTextChange}
          />
          <p>Words: {countWords(corpusText)} / 500</p>
        </div>
        <div className="sm:w-full md:w-45vw lg:w-45vw" style={{ height: '70vh', margin: '10px'}}>
          <Textarea
            className="h-full text-2xl resize-none"
            placeholder="Enter Your Plagiarised Text Here..."
            value={plagiarisedText}
            onChange={handlePlagiarisedTextChange}
          />
          <p>Words: {countWords(plagiarisedText)} / 500</p>
        </div>
      </div>
      <div className="flex item-center justify-center py-8">
        <Button className="text-3xl p-10 font-bold" disabled={isSubmitDisabled()} onClick={handleSubmit}>Check Plagiarism</Button>
      </div>
      <div>
        {loading && <p className='text-4xl flex item-center justify-center px-10'>Loading...</p>}
        {error && <p className='text-4xl flex item-center justify-center px-10'>Error: {error}</p>}
        {result && (
          <div className='px-10 py-4'>
            <h2 className='text-5xl font-bold flex item-center justify-center mb-6'>Result: {result.length > 0 ? result[0].score : 0}%</h2>
            <DataTable columns={columns} data={result}/> 
          </div>
        )}
      </div>

    </main>
  );
}
