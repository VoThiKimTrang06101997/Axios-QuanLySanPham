var updateProductById = function(idProductUpdate, prod) {
    return axios({
        url: "https://60bd867face4d50017aab1ad.mockapi.io/Products/" + idProductUpdate,
        method: "PUT",
        data: prod,
    });
};

var createProduct = function(prod) {
    return axios({
        url: "https://60bd867face4d50017aab1ad.mockapi.io/Products",
        method: "POST",
        data: prod,
    });
};

var removeProduct = function(id) {
    return axios({
        url: "https://60bd867face4d50017aab1ad.mockapi.io/Products/" + id,
        method: "DELETE",
        // data: null,
    });
};

var editProduct = function(id) {
    return axios({
        url: "https://60bd867face4d50017aab1ad.mockapi.io/Products/" + id,
        method: "GET",
        // data: "",
    });
};

var getAllProduct = function() {
    return axios({
        url: "https://60bd867face4d50017aab1ad.mockapi.io/Products",
        method: "GET",
        // data: "null",
    });
};