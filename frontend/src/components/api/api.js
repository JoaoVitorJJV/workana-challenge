const API_URL = "";


const handlerReqPost = async (data, uri) => {
    const URL = API_URL + uri;
    const req = await fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return req;
}

const handlerReqGet = async (query) => {
    const URL = API_URL + query;
    const req = await fetch(URL, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return req;
}

const useApi = {
    signin: async (email, password) => {
        const data = {
            email: email, 
            password: password
        };
        const uri = "/signin";
        const req = await handlerReqPost(data, uri);
        
        const res = await req.json();
        return res;
    },
    signup: async (data) => {
        const uri = "/signup";
        const req = await handlerReqPost(data, uri);

        const res = await req.json();
        return res;
    },
    getProductsType: async () => {
        const query = "/producttype";

        const req = await handlerReqGet(query);
        const res = await req.json();

        return res;
    },
    getProducts: async () => {
        const query = "/products";

        const req = await handlerReqGet(query);
        const res = await req.json();

        return res;
    },
    createProduct: async (data) => {
        const uri = "/product/create";
        const req = await handlerReqPost(data, uri);

        const res = await req.json();
        return res;
    },
    createProductType: async (data) => {
        const uri = "/producttype/create";
        const req = await handlerReqPost(data, uri);

        const res = await req.json();
        return res;
    },
    createSale: async (data) => {
        const uri = "/product/sale/create";
        const req = await handlerReqPost(data, uri);

        const res = await req.json();
        return res;
    }
}

export default useApi
