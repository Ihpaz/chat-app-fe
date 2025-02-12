export const responseErrorApi = (err) => {
    let response
    if (err?.response?.status == 400) {
        response = {
            status:400,
            error:err.response.data.message
        }
    } else if (err?.response?.status == 401) {
        response = {
            status:401,
            error:'Autrhorization'
        }
        window.location.reload();
    }else if (err?.response?.status == 422) {

        response = {
            status:422,
            error:err.response.data.message
        }
    } else {
        response = {
            status:500,
            error:'Terjadi Kesalahan'
        }
    }
    return response
}