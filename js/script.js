document.addEventListener('DOMContentLoaded', function() {
    const myElement = document.querySelector('.my-element');

    if (myElement) {
        myElement.addEventListener('click', function() {
            // Kiểm tra xem phần tử đã có lớp 'enlarged' chưa
            const isEnlarged = this.classList.contains('enlarged');

            if (isEnlarged) {
                // Nếu đang phóng to, đưa về trạng thái ban đầu
                // Xóa các thuộc tính style inline đã thêm vào
                this.style.top = '';
                this.style.left = '';
                this.style.width = '';
                this.style.height = '';
                this.style.transform = ''; // Quan trọng: reset transform
                this.style.padding = ''; // Reset padding nếu bạn muốn nó quay về padding ban đầu
                this.style.fontSize = ''; // Reset font-size

                // Sau một khoảng thời gian ngắn để transition chạy xong, xóa lớp enlarged
                // Điều này giúp hiệu ứng thu nhỏ mượt mà hơn
                setTimeout(() => {
                    this.classList.remove('enlarged');
                    // Đảm bảo phần tử trở về position: inline-block ban đầu
                    this.style.position = '';
                }, 500); // Thời gian này phải khớp với transition time trong CSS
            } else {
                // Nếu chưa phóng to, bắt đầu quá trình phóng to
                // Bước 1: Ghi lại vị trí và kích thước hiện tại của phần tử
                const rect = this.getBoundingClientRect(); // Lấy kích thước và vị trí so với viewport

                // Bước 2: Đặt các thuộc tính style inline để khớp với vị trí hiện tại
                // Điều này quan trọng để tránh giật cục khi chuyển sang position: fixed
                this.style.position = 'fixed'; // Tạm thời đặt fixed để các thuộc tính top/left/width/height có ý nghĩa
                this.style.top = rect.top + 'px';
                this.style.left = rect.left + 'px';
                this.style.width = rect.width + 'px';
                this.style.height = rect.height + 'px';
                // Đặt transform ban đầu là không có gì hoặc translate(0,0)
                this.style.transform = 'translate(0, 0)';
                // Đặt padding và font-size ban đầu
                this.style.padding = '15px 30px'; // Giá trị ban đầu của my-element
                this.style.fontSize = '18px'; // Giá trị ban đầu của my-element

                // Sử dụng requestAnimationFrame để đảm bảo trình duyệt đã cập nhật style
                // trước khi thêm lớp 'enlarged' và kích hoạt transition
                requestAnimationFrame(() => {
                    // Bước 3: Thêm lớp 'enlarged' sau một frame
                    // Lớp này sẽ kích hoạt transition đến vị trí giữa và phóng to
                    this.classList.add('enlarged');
                });
            }
        });
    }
});