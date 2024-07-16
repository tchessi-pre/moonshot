import React, { useState } from 'react';
import { Input } from "@/components/ui/input"




function Form() {
    
    const [eventName, setEventName] = useState('');
    const [place, setPlace] = useState('');
    const [date, setDate] = useState('');
    const [eventType, setEventType] = useState('');
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState('');
    const [lien, setLien] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('null');

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission logic here
        console.log({ eventName, place, date, eventType, number, price, image });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    return (
        <>
         
            <div className='flex flex-col items-center justify-center w-full max-w-md mx-2'>
                <h1 className='text-2xl 
                font-family: Roboto Condensed; 
                font-size: 29.75px;
                font-weight: 700;
                line-height: 34.86px;
                letter-spacing: 0.3em;
                text-align: center;
                text-center my-4'>
                CRÉER UN ÉVÉNEMENT</h1>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center justify-center w-full'
                >
                
                <div className='flex flex-row  items-center justify-center w-full max-w-md mx-2'>
                <div className='flex flex-col items-center justify-center w-full max-w-md mx-2 min-w-[400px]'>

                    <div className='w-full'>
                        <input
                            className='w-full p-3 my-3 rounded-lg'
                            placeholder='Nom'
                            type='text'
                            id='eventName'
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <input
                            className='w-full p-3 my-3 rounded-lg'
                            placeholder='Lieu'
                            type='text'
                            id='place'
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <input
                            className='w-full p-3 my-3 rounded-lg'
                            placeholder='Date'
                            type='date'
                            id='date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <input
                            className='w-full p-3 my-3 rounded-lg'
                            placeholder="Type de l'événement"
                            type='text'
                            id='eventType'
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            required
                        />
                    </div>

                    </div>
                    <div className='flex flex-col items-center justify-center w-full max-w-md mx-2 min-w-[400px]'>
                    <div className='w-full'>
                        <input
                            className='w-full p-3 my-3 rounded-lg'
                            placeholder='Nombre de participants'
                            type='number'
                            id='number'
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <input
                            className='w-full p-3 my-3 rounded-lg'
                            placeholder='Prix (si payant)'
                            type='number'
                            id='price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <input
                            className='w-full p-3 my-3 rounded-lg'
                            placeholder='Lien'
                            type='text'
                            id='lien'
                            value={lien}
                            onChange={(e) => setLien(e.target.value)}
                            required
                        />
                    </div>

                    <div className='w-full'>
                        <input
                            className='w-full p-3 my-3 rounded-lg'
                            placeholder='Tags'
                            type='text'
                            id='tags'
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            required
                        />
                    </div>

                    </div>

                    </div>
                    
                    <div className='flex flex-row items-center justify-center w-full max-w-md mx-2 space-x-1'>
                    <div className='w-full min-w-[400px]'>
                        <input
                            className='w-full p-11 my-3 rounded-lg'
                            placeholder='Description'
                            type='text'
                            id='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    </div>

               
                 <div className='flex flex-row items-center justify-center w-full max-w-md mx-2 space-x-1'>
                   <div className="w-full max-w-[230px] ">
                    
                     <Input id="picture" type="file" className='w-full p-3 my-3 rounded-lg'/>
                      </div>

                     </div>
                    
                    
                    <button
                        type='submit'
                        className='w-34 p-3 my-4 text-white bg-black rounded-lg'
                    >
                        CRÉER MON ÉVÉNEMENT                    </button>
                </form>
            </div>
        </>
    );
}

export default Form;







export function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  )
}
