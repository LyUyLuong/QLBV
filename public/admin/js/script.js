// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonsStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      // console.log(status);
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}
// End Button Status

// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = event.target.elements.keyword.value;
    const valueSelected = document.querySelector("[name=valueSelected]").value;

    if (keyword && valueSelected) {
      url.searchParams.set("valueSelected", valueSelected);
      url.searchParams.set("keyword", keyword);

    } else {
      url.searchParams.delete("keyword");
      url.searchParams.delete("valueSelected");
    }

    window.location.href = url.href;
  });
}
// End Form Search

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination.length > 0) {
  let url = new URL(window.location.href);

  buttonsPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
// End Pagination

// button-change-status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("[form-change-status]");
  const path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      console.log("OK");
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      const location = button.getAttribute("data-location");

      const statusChange = statusCurrent == "active" ? "inactive" : "active";
      let action = ``;
      if (location) {
        action = `${path}/${statusChange}/${id}/${location}?_method=PATCH`;
      }
      else {
        action = `${path}/${statusChange}/${id}?_method=PATCH`;
      }



      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
// End button-change-status

// checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach(input => {
        input.checked = true;
      });
    } else {
      inputsId.forEach(input => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End checkbox-multi

// form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = event.target.elements.status.value;
    // console.log(type);

    if (status == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này?");
      if (!isConfirm) {
        return;
      }
    }

    const inputsChecked = document.querySelectorAll("input[name='id']:checked");
    if (inputsChecked.length > 0) {
      const ids = [];
      const locations = [];

      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputsChecked.forEach(input => {
        const location = input.dataset.location;

        const id = input.value;
        if(location) {
          ids.push(`${id}-${location}`);
        }
        else {
          ids.push(`${id}`);
        }

        // locations.push(location);

      });

      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi!");
    }
  });
}
// End form-change-multi


// Delete Item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
  const formDeleteItem = document.querySelector("[form-delete-item]");
  const path = formDeleteItem.getAttribute("data-path");

  buttonsDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa bản ghi này?");

      if (isConfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=DELETE`;

        formDeleteItem.action = action;

        formDeleteItem.submit();
      }
    });
  });
}
// End Delete Item

// Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert

// Preview Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (event) => {
    const [file] = uploadImageInput.files;
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End Preview Image

// Select MAKHOA in project controller


const checkAllCheckbox = document.getElementById("checkAll");

if (checkAllCheckbox) {

  checkAllCheckbox.addEventListener("change", function (event) {
    const isChecked = event.target.checked; // Kiểm tra xem checkbox check all đã được chọn hay không
    const employeeCheckboxes = document.querySelectorAll(".form-check-input[name='MANV']"); // Lấy tất cả các checkbox nhân viên

    // Kiểm tra xem có ít nhất một checkbox nhân viên tồn tại hay không
    const hasEmployees = employeeCheckboxes.length > 0;


    // Ẩn hoặc hiển thị checkbox checkall tùy thuộc vào có nhân viên trong khoa hay không
    checkAllCheckbox.style.display = hasEmployees ? "block" : "none";

    // Đặt trạng thái checked của tất cả các checkbox nhân viên theo trạng thái của checkbox check all
    employeeCheckboxes.forEach(function (checkbox) {
      checkbox.checked = isChecked;
    });
  });

}


// Lắng nghe sự kiện change trên các ô nhân viên
const employeeCheckboxes = document.querySelectorAll(".form-check-input[name='MANV']");
employeeCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    const allChecked = Array.from(employeeCheckboxes).every(function (checkbox) {
      return checkbox.checked;
    });

    // Kiểm tra nếu tất cả các ô nhân viên đã được chọn thì kiểm tra ô "Check all", ngược lại thì bỏ kiểm tra
    checkAllCheckbox.checked = allChecked;
  });
});


// Lắng nghe sự kiện change trên thẻ select mã khoa
const selectMakhoa = document.getElementById("MAKHOA");

if (selectMakhoa) {

  selectMakhoa.addEventListener("change", function (event) {
    // Xóa các checkbox đã chọn

    checkAllCheckbox.checked = false;
    const employeeCheckboxes = document.querySelectorAll(".form-check-input[name='MANV']:checked");
    employeeCheckboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });

    // Tiếp tục với xử lý hiển thị nhân viên thuộc mã khoa mới được chọn
    const selectedMakhoa = event.target.value; // Lấy mã khoa được chọn
    const employees = document.querySelectorAll(".employee"); // Lấy tất cả các phần tử chứa thông tin nhân viên

    // Ẩn tất cả các nhân viên trước khi hiển thị lại
    employees.forEach(function (employee) {
      employee.style.display = "none";
    });

    // Hiển thị chỉ các nhân viên thuộc mã khoa được chọn
    const selectedEmployees = document.querySelectorAll(`.employee[data-employee="${selectedMakhoa}"]`);
    selectedEmployees.forEach(function (employee) {
      employee.style.display = "block";
    });
  });
}

// End Select MAKHOA in project controller



// Sort
const sort = document.querySelector("[sort]");
if (sort) {
  let url = new URL(window.location.href);

  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");

  // Sắp xếp
  sortSelect.addEventListener("change", () => {
    const [sortKey, sortValue] = sortSelect.value.split("-");

    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url.href;
  });

  // Xóa sắp xếp
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");

    window.location.href = url.href;
  });

  // Thêm selected cho option
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");

  if (sortKey && sortValue) {
    const string = `${sortKey}-${sortValue}`;
    const optionSelected = sortSelect.querySelector(`option[value="${string}"]`);
    optionSelected.selected = true;
    // optionSelected.setAttribute("selected", true);
  }
}
// End Sort

// Permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  // Submit Data
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    const roles = [];

    const rows = tablePermissions.querySelectorAll("[data-name]");
    rows.forEach(row => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach(input => {
          const id = input.value;
          roles.push({
            id: id,
            permissions: ""
          });
        });
      } else {
        inputs.forEach((input, index) => {
          if (input.checked) {
            roles[index].permissions+= name +",";
          }
        });
      }
    });

    // Loại bỏ dấu phẩy cuối cùng (nếu có)
    roles.forEach(role => {
      if (role.permissions.endsWith(",")) {
        role.permissions = role.permissions.slice(0, -1);
      }
    });

    const formChangePermissions = document.querySelector("[form-change-permissions]");
    const inputRoles = formChangePermissions.querySelector("input[name='roles']");
    inputRoles.value = JSON.stringify(roles);
    formChangePermissions.submit();
  });

  // Data Default
    const divRecords = document.querySelector("[data-records]");
    if (divRecords) {
      const records = JSON.parse(divRecords.getAttribute("data-records"));
      records.forEach((record, index) => {
        const permissions = record.permissions.split(",");

        permissions.forEach(permission => {
          const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
          const input = row.querySelectorAll("input")[index];
          input.checked = true;
        });
      });
    }
}
// End Permissions

document.addEventListener('DOMContentLoaded', function() {
  const divEmails = document.querySelector("[data-email]");
  if (divEmails) {
    const emails = JSON.parse(divEmails.getAttribute("data-email"));

    const MANV = document.getElementById("MANV");
    const emailDiv = document.getElementById("email");

    // Tìm giá trị MANV đang chọn trong dropdown và lấy email tương ứng
    const selectedMANV = MANV.value;
    const selectedEmail = emails.find(email => email.MANV == selectedMANV);

    // Nếu tìm thấy email tương ứng, hiển thị vào trường email
    if (selectedEmail) {
      emailDiv.value = selectedEmail.email;
    } else {
      emailDiv.value = ''; // Nếu không tìm thấy, đặt trường email thành rỗng
    }

    // Gắn sự kiện change cho dropdown MANV để cập nhật email khi người dùng thay đổi lựa chọn
    MANV.addEventListener("change", function(event) {
      const MANVSelected = event.target.value;
      const selectedEmail = emails.find(email => email.MANV == MANVSelected);

      if (selectedEmail) {
        emailDiv.value = selectedEmail.email;
      } else {
        emailDiv.value = '';
      }
    });
  }
});

  
  // Chuyển đổi permissions từ chuỗi sang mảng
  // records.forEach(record => {
  //   record.permissions = record.permissions.split(",");
  // });

  // console.log(emails);

