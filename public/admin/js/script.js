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

// Select MAKHOA in create project


































document.addEventListener("DOMContentLoaded", function() {
  const divMAKHOA = document.getElementById("MAKHOA");
  const checkAllDepartment = document.getElementById("checkAll");

  if (divMAKHOA) {
    const divEmployees = document.querySelector("[data-employees]");
    const divMANV = document.querySelector("[divMANV]");

    function displayEmployees(selectedMAKHOA) {
      divMANV.innerHTML = '';
      const employeesJSON = divEmployees.getAttribute("data-employees");
      const employees = JSON.parse(employeesJSON);

      employees.forEach(employee => {
        if (employee.MAKHOA === selectedMAKHOA) {
          const containerDiv = document.createElement('div');
          containerDiv.className = 'form-check';

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.className = 'form-check-input';
          checkbox.id = employee.MANV;
          checkbox.name = 'MANV';
          checkbox.value = employee.MANV;

          const label = document.createElement('label');
          label.className = 'form-check-label';
          label.htmlFor = employee.MANV;
          label.textContent = `${employee.HONV} ${employee.TENLOT} ${employee.TENNV}`;

          containerDiv.appendChild(checkbox);
          containerDiv.appendChild(label);

          divMANV.appendChild(containerDiv);
        }
      });

      updateCheckboxEvents(); // Gọi hàm để cập nhật sự kiện cho checkbox
    }

    function updateCheckboxEvents() {
      const checkboxes = divMANV.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
          countCheckedEmployees();
        });
      });
    }

    function countCheckedEmployees() {
      const checkboxes = divMANV.querySelectorAll('input[type="checkbox"]');
      const checkboxesNum = checkboxes.length;
      let checkedEmployees = 0;
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          checkedEmployees++;
        }
      });

      // Kiểm tra và cập nhật trạng thái của nút "Chọn tất cả"
      checkAllDepartment.checked = (checkedEmployees === checkboxesNum);
    }

    if (checkAllDepartment) {
      checkAllDepartment.addEventListener("change", () => {
        const checkboxes = divMANV.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
          checkbox.checked = checkAllDepartment.checked;
        });
        countCheckedEmployees();
      });
    }

    const selectedMAKHOA = divMAKHOA.value;
    displayEmployees(selectedMAKHOA);

    divMAKHOA.addEventListener("change", () => {
      displayEmployees(divMAKHOA.value);
      if (checkAllDepartment) {
        checkAllDepartment.checked = false;
      }
      updateCheckboxSelection();
    });
  }

  function updateCheckboxSelection() {
    const divSelectedEmployees = document.querySelector("[data-selectedemployees]");
    const divMANV = document.querySelector("[divmanv]");
    
    if (divSelectedEmployees && divMANV) {
      const selectedEmployeesJSON = divSelectedEmployees.getAttribute("data-selectedemployees");
      const selectedEmployees = JSON.parse(selectedEmployeesJSON);
      const formChecks = divMANV.querySelectorAll(`input[type="checkbox"]`);
      
      let checkedEmployees = 0; // Số lượng ô đã được đánh dấu
      let totalEmployees = 0; // Tổng số ô đánh dấu
      
      formChecks.forEach(checkbox => {
        const value = checkbox.value;
        const isSelected = selectedEmployees.some(employee => employee.MANV === value);
        checkbox.checked = isSelected;
  
        if (checkbox.checked) {
          checkedEmployees++;
        }
        totalEmployees++;
      });
  
      // Kiểm tra và cập nhật trạng thái của nút "Chọn tất cả"
      const checkAllDepartment = document.getElementById("checkAll");
      if (checkAllDepartment) {
        if(checkedEmployees === totalEmployees && checkedEmployees != 0) {
          checkAllDepartment.checked = (checkedEmployees === totalEmployees);
        }
        
      }
    }
  }
  
  
  updateCheckboxSelection();
});







