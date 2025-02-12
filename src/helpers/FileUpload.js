import axios from '../plugins/axios'; // Sesuaikan path dengan struktur proyek Anda
import store from '../store/index'
import {responseErrorApi} from './response.js'
import { toast } from 'vue3-toastify'



export const uploadImage =(event) => {
    console.log(event);
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    try {
        const response = axios.post('/master/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + store.getters['Auth/token']
            }
        });
        return response
    } catch (error) {
        console.error(error);
    }
}

export const uploadFile =(event) => {
    console.log(event);
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    try {
        const response = axios.post('/master/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + store.getters['Auth/token']
            }
        });
        return response
    } catch (error) {
        console.error(error);
    }
}
export const downloadFile = async (id, file_name) => {
    try {
        const response = await axios.post(`/master/files/${id}/download`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + store.getters['Auth/token']
            },
            responseType: 'blob' // Set responseType to 'blob'
        });

        // Create a blob object from the response data
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        // Create a temporary anchor element
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        document.body.appendChild(anchor);

        // Create a URL for the blob data
        const objectURL = window.URL.createObjectURL(blob);
        anchor.href = objectURL;
        anchor.download = file_name;

        // Trigger a click event on the anchor element to initiate download
        anchor.click();

        // Cleanup
        window.URL.revokeObjectURL(objectURL);
        document.body.removeChild(anchor);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};

export const exportPdf = async (url,file_name) => {
    const config = {
          ...store.getters["Auth/config"],
          responseType: 'blob'
    };
    let response;
    await axios
        .get(
           url,
           config
        )
        .then((ress) => {
            const url = window.URL.createObjectURL(new Blob([ress.data],{type: 
                            'application/pdf'})); 
            let filename = file_name+'_' + Date.now() + '.pdf';
            const link = document.createElement('a'); 
            link.href = url;
            link.setAttribute('download', filename); 
            document.body.appendChild(link);
            link.click();
        })
        .catch((err) => {
            response =err?.response?.status;
        });
    
        // response type blob jadi penanganan error berbeda
        //agar tidak ke load jadi ga pakai function dri response
       
        if(response == 401){
            toast.error('Unauthorized', {
                    position: toast.POSITION.TOP_CENTER,
                    className: "w-96",
            });
        }
}

export const exportExcel = async (url, file_name) => {
    const config = {
        ...store.getters["Auth/config"],
        responseType: 'blob' // Set response type to blob for file download
    };

    let responseStatus;
    await axios
        .get(url, config)
        .then((ress) => {
            // Create a blob object for Excel
            const url = window.URL.createObjectURL(new Blob([ress.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            let filename = file_name + '_' + Date.now() + '.xlsx'; // Create dynamic filename with timestamp

            // Create a link element to download the Excel file
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Set the download attribute for the link
            document.body.appendChild(link);
            link.click(); // Programmatically click the link to trigger download

            // Clean up the link after download
            link.remove();
        })
        .catch((err) => {
            // Capture response status in case of error
            responseStatus = err?.response?.status;
        });

    // Check for specific errors like Unauthorized (401)
    if (responseStatus === 401) {
        toast.error('Unauthorized', {
            position: toast.POSITION.TOP_CENTER,
            className: "w-96"
        });
    }
};




