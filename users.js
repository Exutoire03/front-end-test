

const USERS_PER_PAGE = 20;
const TOTAL_USERS = 500;
const TOTAL_PAGES = Math.ceil(TOTAL_USERS / USERS_PER_PAGE);

function loadUsers(page = 1) {
  $.get(`https://gorest.co.in/public/v2/users?page=${page}&per_page=${USERS_PER_PAGE}`, function(users) {
    let rows = '';
    users.forEach(user => {
      
      let avatar = user.gender === 'female' ? 'https://randomuser.me/api/portraits/women/' + (user.id % 100) + '.jpg' : 'https://randomuser.me/api/portraits/men/' + (user.id % 100) + '.jpg';
      let badgeClass = user.status === 'active' ? 'user-status-badge active' : 'user-status-badge inactive';
      let badgeText = user.status.charAt(0).toUpperCase() + user.status.slice(1);
      rows += `
        <tr>
          <td>
            <div class="user-info">
              <div class="user-avatar"><img src="${avatar}" alt="${user.name}" /></div>
              <div class="user-details">
                <div class="user-name">${user.name}</div>
                <div class="user-email">${user.email}</div>
              </div>
            </div>
          </td>
          <td style="text-align:center;">${user.gender === 'male' ? 'Homme' : 'Femme'}</td>
          <td style="text-align:center;"><span class="${badgeClass}">${badgeText}</span></td>
        </tr>
      `;
    });
    $('#users-table tbody').html(rows);
    $('.pagination .page-btn').removeClass('active');
    $(`.pagination .page-btn[data-page=${page}]`).addClass('active');
  });
}

$(document).ready(function() {
  $('.pagination').html(`
    <button id="prev-btn">Précédent</button>
    <button id="next-btn">Suivant</button>
  `);

  let currentPage = 1;
  loadUsers(currentPage);

  // Recherche dynamique sur la page courante
  $(document).on('input', '.search-box input', function() {
    const search = $(this).val().toLowerCase();
    $('#users-table tbody tr').each(function() {
      const name = $(this).find('.user-name').text().toLowerCase();
      const email = $(this).find('.user-email').text().toLowerCase();
      if(name.includes(search) || email.includes(search)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  $('#prev-btn').click(function() {
    if(currentPage > 1) {
      currentPage--;
      loadUsers(currentPage);
    }
  });
  $('#next-btn').click(function() {
    if(currentPage < TOTAL_PAGES) {
      currentPage++;
      loadUsers(currentPage);
    }
  });
});

// Gestion modale ajout utilisateur
$(function() {
  
  $('.users-add-btn').click(function(e) {
    if($(this).closest('#addUserForm').length === 0) {
      $('#addUserModal').fadeIn(150);
      $('#addUserForm')[0].reset();
      $('#addUserError').text('');
    }
  });
  
  $('.close-modal').click(function() {
    $('#addUserModal').fadeOut(150);
  });
  $(window).on('click', function(e) {
    if($(e.target).is('#addUserModal')) $('#addUserModal').fadeOut(150);
  });

  // Soumission du formulaire
  $('#addUserForm').submit(function(e) {
    e.preventDefault();
    var data = {
      name: this.name.value,
      email: this.email.value,
      gender: this.gender.value,
      status: this.status.value
    };
    
    var token = '95b2b50b94fe3b46ae16f7b8c757399bcb18cf68dde0bb6ae4f3371489b51362';
    $.ajax({
      url: 'https://gorest.co.in/public/v2/users',
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token },
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(user) {
        var avatar = user.gender === 'female' ? 'https://randomuser.me/api/portraits/women/' + (user.id % 100) + '.jpg' : 'https://randomuser.me/api/portraits/men/' + (user.id % 100) + '.jpg';
        var row = `<tr><td><div class='user-info'><div class='user-avatar'><img src='${avatar}' alt='${user.name}' /></div><div class='user-details'><div class='user-name'>${user.name}</div><div class='user-email'>${user.email}</div></div></div></td><td style='text-align:center;'>${user.gender === 'male' ? 'Homme' : 'Femme'}</td><td style='text-align:center;'><span class='user-status-badge ${user.status === 'active' ? 'active' : 'inactive'}'>${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td></tr>`;
        $('#users-table tbody').prepend(row);
        $('#addUserModal').fadeOut(150);
      },
      error: function(xhr) {
        var msg = 'Erreur lors de l\'ajout.';
        if(xhr.responseJSON && xhr.responseJSON[0] && xhr.responseJSON[0].message) {
          msg = xhr.responseJSON[0].message;
        }
        $('#addUserError').text(msg);
      }
    });
  });
}); 