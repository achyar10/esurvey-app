import Swal from "sweetalert2";

export const useAlert = (msg: string, icon: any = 'error') => {
    const alert = Swal.fire({
        title: '',
        text: msg,
        allowOutsideClick: false,
        icon: icon,
        confirmButtonColor: "#DD6B55",
    })
    return alert;
};