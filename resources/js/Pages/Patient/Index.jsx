import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import MessagesAlerts from "@/Components/MessagesAlerts";
import { PencilSquareIcon, TrashIcon, BackspaceIcon } from '@heroicons/react/16/solid';
import { Broom } from "@phosphor-icons/react";

export default function Index({ auth, patients, queryParams = null }) {
    queryParams = queryParams || {};
    const { flash } = usePage().props;

    const searchFieldChanged = (name, value) => {
        if (value != 0) {
            queryParams[name] = value
        } else {
            queryParams['name'] = ""
            queryParams['gender'] = ""
            delete queryParams[name]
        }

        router.get(route('patient.index'), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route('patient.index'), queryParams);
    };

    const deletePatient = (patient) => {
        MessagesAlerts.ModalConfirm('patient', patient);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-indigo-800 dark:text-indigo-200 leading-tight">
                        Pacientes
                    </h2>
                    <Link href={route("patient.create")} className="bg-blue-700 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-800">
                        Agregar
                    </Link>
                </div>
            }
        >
            <Head title="Pacientes" />

            {/* <div className="py-12"> */}
                {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> */}
                <div>
                    {flash.message && (
                        <MessagesAlerts.ModalToast type="success" message={flash.message} />
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(patients, undefined, 2)}</pre> */}
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-50 dark:text-gray-400 ">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-indigo-400 border-b-2 border-indigo-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>
                                            <TableHeading
                                                name="name"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Nombre
                                            </TableHeading>
                                            <TableHeading
                                                name="surname_father"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                A. Paterno
                                            </TableHeading>
                                            <TableHeading
                                                name="surname_mother"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                A. Materno
                                            </TableHeading>
                                            <TableHeading
                                                name="age"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Edad
                                            </TableHeading>
                                            <TableHeading
                                                name="gender"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Género
                                            </TableHeading>
                                            <th className="px-3 py-2 text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-indigo-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.name}
                                                    placeholder="Nombre paciente"
                                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2"></th>
                                            <th className="px-3 py-2">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={queryParams.gender}
                                                    onChange={e => searchFieldChanged('gender', e.target.value)}
                                                >
                                                    <option value="">Selecciona género</option>
                                                    <option value="F">Femenino</option>
                                                    <option value="M">Masculino</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-2 text-right">
                                                <button onClick={() => searchFieldChanged('clear', 0)} >
                                                    <Broom size={28} className={"h-7 w-7 text-indigo-400 hover:text-indigo-600 mx-1"} />
                                                    {/* <BackspaceIcon className={"h-10 w-10 text-orange-500 hover:text-orange-600 mx-1"} /> */}
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.data.map((patient) => (
                                            <tr key={patient.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-2 dark:text-gray-300 text-gray-700">{patient.id}</td>
                                                <td className="px-3 py-2 dark:text-gray-300 text-gray-700">{patient.name}</td>
                                                <td className="px-3 py-2 dark:text-gray-300 text-gray-700">{patient.surname_father}</td>
                                                <td className="px-3 py-2 dark:text-gray-300 text-gray-700">{patient.surname_mother}</td>
                                                <td className="px-3 py-2 dark:text-gray-300 text-gray-700">{patient.age}</td>
                                                <td className="px-3 py-2 dark:text-gray-300 text-gray-700">{patient.gender}</td>
                                                <td className="px-3 py-2 dark:text-gray-300 text-gray-700 flex justify-between">
                                                    <Link href={route("patient.edit", patient.id)} className="w-4 ">
                                                        <PencilSquareIcon className={"h-5 w-5 text-blue-500 hover:text-blue-600"} />
                                                    </Link>
                                                    <button onClick={() => deletePatient(patient)} >
                                                        <TrashIcon className={"h-5 w-5 text-red-500 hover:text-red-600 mx-1"} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={patients.links} />
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </AuthenticatedLayout>
    )
}
