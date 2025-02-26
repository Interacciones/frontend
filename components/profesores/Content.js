"use client";
import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import Grid from './Grid';


export default function Content({ teachers }) {
    const [filter, setFilter] = useState({ nombre: '', curso: '', area: '' });


    return (
        <div className="min-h-screen flex flex-wrap justify-between text-black bg-gray-100 py-4 lg:py-12 px-4 sm:px-6 lg:px-8">
            <div className='w-full mx-auto mb-7 lg:w-[25rem] lg:ml-1 lg:mr-0'>
                <Filter setFilter={setFilter} />
            </div>
            <Grid teachers={teachers} filter={filter} />
        </div>
    )
}
