import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
const create = () => {

    const initialData={
     name : "",
     phone : "",
     avatar : null,
     visibility :""
    


    }
    const{data,errors, setData} = useForm (initialData)


  return (
   <AuthenticatedLayout
              header={
                            <div> 
                  <h2 className="text-xl font-semibold leading-tight text-gray-800">
                      Contactos
                  </h2>
                <Link href={route('contactos.index')} className="btn btn-primary">volver</Link>
  
                  </div>
              }
          >
              <Head title="create" />
  
              <div className="py-12">
                  <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                          <div className="p-6 text-gray-900">
                          <form action="">
   <InputLabel  htmlFor="name" value="nombre" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('name', e.target.value)}
                        
                    />

                    <InputError message={errors.name} className="mt-2" />



                          </form>
                          </div>
                      </div>
                  </div>
              </div>
          </AuthenticatedLayout>
    )
  }


export default create