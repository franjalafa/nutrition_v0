import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        surname_father: '',
        surname_mother: '',
        age: '',
        gender: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("patient.store"));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Crear Nuevo Pacientes
                    </h2>
                </div>
            }
        >
            <Head title="Pacientes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Paciente Nombre:"
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="surname_father"
                                    value="Apellido paterno:"
                                />
                                <TextInput
                                    id="surname_father"
                                    name="surname_father"
                                    type="text"
                                    value={data.surname_father}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("surname_father", e.target.value)}
                                />
                                <InputError
                                    message={errors.surname_father}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="surname_mother"
                                    value="Apellido materno:"
                                />
                                <TextInput
                                    id="surname_mother"
                                    name="surname_mother"
                                    type="text"
                                    value={data.surname_mother}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("surname_mother", e.target.value)}
                                />
                                <InputError
                                    message={errors.surname_mother}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="age"
                                    value="Edad:"
                                />
                                <TextInput
                                    id="age"
                                    name="age"
                                    type="number"
                                    value={data.age}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("age", e.target.value)}
                                />
                                <InputError
                                    message={errors.age}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="gender"
                                    value="Edad:"
                                />

                                <SelectInput
                                    id="gender"
                                    name="gender"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("gender", e.target.value)}
                                >
                                    <option value="">Selecciona género</option>
                                    <option value="F">Femenino</option>
                                    <option value="M">Masculino</option>
                                </SelectInput>
                                <InputError
                                    message={errors.gender}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 text-right">
                                <Link href={route("patient.index")} className="bg-neutral-200 py-1 px-3 text-neutral-800 rounded shadow transition-all hover:bg-neutral-300 mr-2">
                                    Regresar
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
