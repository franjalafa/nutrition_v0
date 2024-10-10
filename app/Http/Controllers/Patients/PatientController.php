<?php

namespace App\Http\Controllers\Patients;

use Inertia\Inertia;
use App\Models\Patients\Patient;
use App\Http\Controllers\Controller;
use App\Http\Resources\Patients\PatientResource;
use App\Http\Requests\Patients\StorePatientRequest;
use App\Http\Requests\Patients\UpdatePatientRequest;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Patient::query();
        $sortFields = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("gender")) {
            $query->where("gender", request("gender"));
        }

        /**
         * * Se agrega renderización de página personalizada,
         * * ya que el proceso no funciona como se esperaba
         * * se tiene que renderizar a la página 1 cada que se busca
         * * si la página de donde se busca es igual al total, se mantiene
         */
        $queryCount = $query->count();
        $pagesCount = ceil($queryCount / 10);
        $pageCurrent = intval(request("page"));
        if ($pageCurrent > $pagesCount) {
            $pageCurrent = 1;
        }

        $patients = $query->orderBy($sortFields, $sortDirection)
            ->paginate(10, page: $pageCurrent)
            ->withQueryString()
            ->onEachSide(1);

        /* if (!$patients)
            $patients['data'] = 'Sin información a mostrar'; */

        return Inertia::render(
            'Patient/Index',
            [
                // "patients" => PatientResource::collection($patients),
                'patients' => $patients,
                "queryParams" => request()->query() ?: null
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Patient/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientRequest $request)
    {
        $data = $request->validated();
        Patient::create($data);

        return to_route('patient.index')->with('message', 'Paciente fue creado');
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        return inertia('Patient/Edit', [
            // si se manda el resource, en el props se debe de idntifiacr el data
            'patient' => new PatientResource($patient)
            // 'patient' => $patient,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        $data = $request->validated();
        $patient->update($data);

        return to_route('patient.index')->with('message', "Paciente \"{$patient->name}\" se actualizó");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $name = $patient->name;
        $patient->delete();

        return to_route('patient.index')->with('message', "Paciente \"{$name}\" eliminado con éxito");
    }
}
