import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { router } from "@inertiajs/react";

const MySwal = withReactContent(Swal);
const MessagesAlerts = () => { }

const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = MySwal.stopTimer;
        toast.onmouseleave = MySwal.resumeTimer;
    }
});

const modalToast = (props) => {
    const { type, message } = props;

    Toast.fire({
        icon: type,
        title: message,
        background: (type == 'success') ? '#10b981' : '#b91c1c',
        color: '#f5f5f5'
    })
};


const swalButtons = MySwal.mixin({
    customClass: {
        confirmButton: "bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600",
        cancelButton: "bg-neutral-200 py-1 px-3 text-neutral-800 rounded shadow transition-all hover:bg-neutral-300 ml-10"
    },
    buttonsStyling: false
});

const modalConfirm = (model, data) => {
    swalButtons.fire({
        title: "¿Esta seguro de eliminar el registro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        background: '#1F2937',
        color: '#f5f5f5'
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(route(model + '.destroy', data.id))
        }
    });
};


/**
 * @param model
 * @param data
 * * model -> Se recibe nombre del modelo, se envía como texto
 * * data -> Es el modelo con la información a ser eliminada
 */
MessagesAlerts.ModalConfirm = modalConfirm;

/**
 *
 * @param { props } type
 * @param { string } message
 * * type -> tipo de toast a mostrar 'success', 'error', etc
 * * message -> mensaje de texto a mostrar en el toast
 */
MessagesAlerts.ModalToast = modalToast;

export default MessagesAlerts;
