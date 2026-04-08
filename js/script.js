// 1. DATA PRODUK (JSON/JS Object) - Mudah diedit dan ditambah!
const productData = [
    {
        id: "p1",
        category: "Illustration",
        title: "Anime Illustration",
        price: "Start from $13",
        features: ["Full Color", "Simple Background", "1 Character", "Bust up / Halfbody / Fullbody"],
        image: "../assets/images/anime_ilustrasi/2.png",
        delay: 0
    },
    {
        id: "p2",
        category: "VTuber",
        title: "Live2D Model & Rigging",
        price: "Start from $400",
        features: ["Ready to Rig PSD", "XYZ Head & Body", "Physics (Hair, Clothes)", "Basic Expressions"],
        image: "../assets/images/l2d/IMG_0890.PNG",
        delay: 100
    },
    { 
        id: "p3",
        category: "Furry",
        title: "Furry Commission",
        price: "Start from $15",
        features: ["Anthro / Feral", "Vibrant Coloring", "Custom Species", "Reference Sheet Available"],
        image: "../assets/images/Furry/IMG_0892.PNG",
        delay: 200
    }
];

// 2. Render Product Cards dynamically
const productContainer = document.getElementById('product-container');

productData.forEach(product => {
    // Generate List Items
    let featureList = product.features.map(f => `
                <li class="flex items-center gap-2 mb-2 text-slate-600 text-sm">
                    <i class="fa-solid fa-check text-pink-500"></i> ${f}
                </li>
            `).join('');

    // Create HTML structure
    const cardHTML = `
                <div class="bg-white border-2 border-slate-200 hover:border-pink-500 transition-all duration-300 group overflow-hidden shadow-sm hover:shadow-[8px_8px_0px_rgba(244,114,182,1)]" data-aos="fade-up" data-aos-delay="${product.delay}">
                    <div class="h-64 overflow-hidden relative border-b-2 border-slate-200 group-hover:border-pink-500 transition-colors">
                        <div class="absolute top-4 left-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest z-10">
                            ${product.category}
                        </div>
                        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                    </div>
                    <div class="p-8">
                        <h3 class="text-2xl font-black uppercase mb-1">${product.title}</h3>
                        <p class="text-pink-500 font-bold mb-6 text-lg">${product.price}</p>
                        <ul class="mb-8 font-medium">
                            ${featureList}
                        </ul>
                        <button onclick="handleOrder('${product.title}')" class="w-full py-3 bg-slate-900 text-white font-bold uppercase tracking-widest hover:bg-pink-500 transition-colors">
                            Order Now
                        </button>
                    </div>
                </div>
            `;
    productContainer.innerHTML += cardHTML;
});

// 3. Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    // Menunggu 1.5 detik untuk memunculkan efek
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.visibility = 'hidden';
            preloader.style.display = 'none';
            // Inisialisasi AOS setelah preloader hilang agar animasi hero berjalan sempurna
            AOS.init({
                duration: 800,
                once: true,
                offset: 100
            });
        }, 800);
    }, 1500);
});

// 4. SweetAlert2 - Handle Order Button di Card
function handleOrder(productName) {
    Swal.fire({
        title: 'Order ' + productName,
        html: `<p style="font-family: 'Outfit', sans-serif;">Pilih metode pemesanan untuk <strong>${productName}</strong>:</p>`,
        icon: 'info',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-envelope"></i> via Email',
        denyButtonText: '<i class="fa-solid fa-store"></i> via VGen',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#f472b6',
        denyButtonColor: '#0f172a',
        customClass: {
            title: 'font-black uppercase',
            confirmButton: 'font-bold uppercase tracking-widest rounded-none',
            denyButton: 'font-bold uppercase tracking-widest rounded-none'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const mailtoUrl = `mailto:ayasylfiette@gmail.com?subject=Commission Inquiry: ${productName}&body=Halo Ayasylfiette,%0A%0ASaya tertarik untuk komisi layanan ${productName}.%0A%0ABerikut adalah detail ide/konsep saya: [Tuliskan konsep kamu di sini]%0A%0ATerima kasih.`;
            window.location.href = mailtoUrl;
        } else if (result.isDenied) {
            window.open('https://vgen.co/AYA030', '_blank');
        }
    });
}

// 5. SweetAlert2 - Handle Contact Form Submit
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('senderName').value;
    const service = document.getElementById('senderService').value;
    const message = document.getElementById('senderMessage').value;

    Swal.fire({
        title: 'Kirim Email?',
        text: "Aplikasi Email default kamu akan terbuka.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Kirim!',
        confirmButtonColor: '#f472b6',
        cancelButtonColor: '#0f172a',
        customClass: {
            title: 'font-black uppercase',
            confirmButton: 'font-bold uppercase tracking-widest rounded-none',
            cancelButton: 'font-bold uppercase tracking-widest rounded-none'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Encode for URL safely
            const subject = encodeURIComponent(`Inquiry from ${name} - ${service}`);
            const body = encodeURIComponent(`Halo Ayasylfiette,\n\nNama: ${name}\nTipe Jasa: ${service}\n\nDetail Pesan:\n${message}\n\nTerima kasih.`);

            window.location.href = `mailto:ayasylfiette@gmail.com?subject=${subject}&body=${body}`;

            // Reset form optional
            document.getElementById('contactForm').reset();
        }
    });
});

// SweetAlert2 - Handle Contact Form Submit to WhatsApp
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // 1. Ambil data dari input form
    const name = document.getElementById('senderName').value;
    const service = document.getElementById('senderService').value;
    const message = document.getElementById('senderMessage').value;

    // 2. Susun format pesan WhatsApp (Rapi, Jelas, dan Formal)
    // Menggunakan asterisk (*) untuk teks tebal (bold) di WhatsApp
    const waText = `Halo Ayasylfiette,

Perkenalkan, saya *${name}*. Saya ingin berdiskusi mengenai pemesanan komisi dengan detail sebagai berikut:

*Tipe Jasa:* ${service}
*Deskripsi & Konsep:*
${message}

Mohon informasi lebih lanjut mengenai ketersediaan antrian (slot) dan estimasi pembayarannya. Terima kasih banyak.`;

    // 3. Nomor WhatsApp tujuan (Ganti 0 awalan dengan 62)
    const waNumber = "62895604283648";

    // 4. Encode teks pesan agar valid saat dimasukkan ke dalam URL
    const encodedWaText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedWaText}`;

    // 5. Tampilkan popup konfirmasi dengan SweetAlert2
    Swal.fire({
        title: 'Kirim via WhatsApp?',
        text: "Kamu akan diarahkan ke aplikasi WhatsApp untuk mengirim pesan ini.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-brands fa-whatsapp"></i> Buka WhatsApp',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#25D366', // Warna hijau khas WhatsApp
        cancelButtonColor: '#0f172a',
        customClass: {
            title: 'font-black uppercase',
            confirmButton: 'font-bold uppercase tracking-widest rounded-none',
            cancelButton: 'font-bold uppercase tracking-widest rounded-none'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Buka link WhatsApp di tab baru
            window.open(waUrl, '_blank');

            // Opsional: Kosongkan isi form setelah berhasil dialihkan
            document.getElementById('contactForm').reset();
        }
    });
});
