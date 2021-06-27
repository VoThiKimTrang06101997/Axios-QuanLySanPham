var idProductUpdate;
var danhSachSP = [];

// Thêm Sản phẩm
// On click chỉ bắt được 1 sự kiện. Còn addEventListener có thể bắt được nhiều sự kiện cùng 1 lúc, ví dụ "click onchange"
document.getElementById("btnAddProduct").addEventListener("click", function () {
  // lấy Value người dùng nhập vào
  var TenSP = document.getElementById("TenSP").value;
  var GiaSP = document.getElementById("GiaSP").value;
  var HinhSP = document.getElementById("HinhSP").value;
  var loaiSP = document.getElementById("loaiSP").value;

  // debugger;

  // kiểm tra dữ liệu đầu vào
  var isValid =
    checkEmpty(TenSP, "thongBaoTenSP", "Không được để trống Tên sản phẩm") &
    checkEmpty(GiaSP, "thongBaoGia", "Không được để trống Giá Sản phẩm");
  isValid =
    isValid &
    checkLength(TenSP, "thongBaoTenSP", "Độ dài phải từ 1-10", 1, 10) &
    checkLength(GiaSP, "thongBaoGia", "Độ dài phải từ 5-10", 5, 10);
  if (isValid == true) {
    var prod = new Product(TenSP, GiaSP, HinhSP, loaiSP);
    console.log("prod", prod);

    createProduct(prod)
      .then(function (res) {
        console.log(res);
        alert("Thêm Sản Phẩm thành công");
        fetchData();
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
  }

  var prod = new Product(TenSP, GiaSP, HinhSP, loaiSP);

  console.log("prod", prod);

  // thằng lấy tất cả về thì dùng phương thức method là GET, thêm mới và lấy dữ liệu mới về thì dùng phương thức method POST
  // axios({
  //     url: "https://60bd867face4d50017aab1ad.mockapi.io/Products",
  //     method: "POST",
  //     data: prod,
  // })

  createProduct(prod)
    .then(function (res) {
      console.log(res);
      alert("Thêm Sản Phẩm Thành Công");
      fetchData();
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Cập nhật sản phẩm
document
  .getElementById("btnUpdateProduct")
  .addEventListener("click", function () {
    // lấy Value người dùng nhập vào
    var TenSP = document.getElementById("TenSP").value;
    var GiaSP = document.getElementById("GiaSP").value;
    var HinhSP = document.getElementById("HinhSP").value;
    var loaiSP = document.getElementById("loaiSP").value;

    var prod = new Product(TenSP, GiaSP, HinhSP, loaiSP);
    console.log("prod", prod);

    updateProductById(idProductUpdate, prod)
      .then(function (res) {
        alert("Cập nhật thành công");
        fetchData();
      })
      .catch(function (err) {
        console.log(err);
      });
  });

// Tính năng Sửa sản phẩm
var handleEdit = function (id) {
  console.log(id);
  idProductUpdate = id;

  // axios({
  //     url: "https://60bd867face4d50017aab1ad.mockapi.io/Products/" + id,
  //     method: "GET",
  //     // data: "",
  // })

  editProduct(id)
    .then(function (res) {
      console.log(res);
      var product = res.data;
      document.getElementById("TenSP").value = product.name;
      document.getElementById("GiaSP").value = product.price;
      document.getElementById("HinhSP").value = product.image;
      document.getElementById("loaiSP").value = product.description;
    })
    .catch(function (err) {
      console.log(err);
    });
};

// Tính năng Xóa sản phẩm
var handleDelete = function (id) {
  console.log("handleDelete: ", id);

  // axios({
  //     url: "https://60bd867face4d50017aab1ad.mockapi.io/Products/" + id,
  //     method: "DELETE",
  //     // data: null,
  // })

  removeProduct(id)
    .then(function (res) {
      console.log(res);
      alert("Xóa thành công");
      // Lên server lấy Data mới về
      // Render Data ra màn hình
      fetchData();
    })
    .catch(function (err) {
      console.log(err);
    });
};

// Tính năng hiển thị danh sách sản phẩm lên màn hình
var renderProductList = function (list) {
  console.log("list: ", list);
  var contentTbody = "";
  list.map(function (item, index) {
    contentTbody += `
        <tr>
            <td> ${index + 1} </td>
            <td> ${item.name} </td>
            <td> ${item.price} </td>
            <td> <img src="${item.image}" width="100px" /> </td>
            <td> ${item.description} </td>
            <td>
                <button class="btn btn-danger" onclick="handleDelete(${
                  item.id
                })"> Xóa </button>
                <button data-toggle="modal" data-target="#myModal" class="btn btn-info" onclick="handleEdit(${
                  item.id
                })"> Sửa </button>
            </td>
        </tr>
        `;
  });
  document.getElementById("tblDanhSachSP").innerHTML = contentTbody;
};

/**
 * axios trả về promise
 *  promise:
 *   -thành công thì--   .then()
 *   -thất bại thì --    .catch()
 *   -chờ ---    pending
 *   -dùng hàm gọi lại là Call Back  =>> cách này đã cổ xưa và ít xài
 */

function fetchData() {
  // axios({
  //     url: "https://60bd867face4d50017aab1ad.mockapi.io/Products",
  //     method: "GET",
  //     // data: "null",
  // })

  getAllProduct()
    .then(function (res) {
      console.log(res);
      danhSachSP = res.data;
      renderProductList(danhSachSP);
    })
    .catch(function (err) {
      console.log(err);
    });
}
fetchData();

// Xử lý tính năng Search
document.getElementById("btnSearch").addEventListener("click", function () {
  console.log(danhSachSP);
  var txtSearch = document.getElementById("txtSearch").value;
  // Tìm kiếm Sản Phẩm theo tên
  var danhSachSPFilter = danhSachSP.filter(function (prod) {
    return prod.name.toLowerCase().includes(txtSearch.toLowerCase());
  });

  console.log("danhSachSPFilter : ", danhSachSPFilter);

  renderProductList(danhSachSPFilter);
});

