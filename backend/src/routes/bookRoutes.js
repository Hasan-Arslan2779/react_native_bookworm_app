import exsspress from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import Book from "../models/Book.js";
import cloudinary from "../lib/cloudinary.js";

const router = exsspress.Router();

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, rating, caption, image } = req.body;
    if (!image || !title || !caption || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //upload image to cloudinary
    // const uploadResponse = await cloudinary.uploader.upload(image, {
    //   folder: "bookworm",
    // });
    // Güvenli URL'yi al
    const imageUrl = uploadResponse.secure_url;

    // Yeni kitap oluştur
    const newBook = new Book({
      title,
      caption,
      image: imageUrl,
      rating,
      user: req.user._id, // Assuming req.user is set by authentication middleware
    });
    // Kitabı veritabanına kaydet
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all books
// Bu route, tüm kitapları sayfalı olarak getirir
// Kullanıcı kimliğini doğrulamak için protectRoute middleware'ini kullanır
// Kitaplar, en yeni eklenenlerden en eskiye doğru sıralanır
// Her sayfada 5 kitap gösterilir ve toplam sayfa sayısı hesaplanır
// Kullanıcı bilgileri de kitaplarla birlikte döndürülür
//pagination
router.get("/", protectRoute, async (req, res) => {
  try {
    const page = req.query.page || 1; // Sayfa numarasını al, varsayılan 1
    const limit = 5; // Her sayfada gösterilecek kitap sayısı
    const skip = (page - 1) * limit; // Atlanacak kitap sayısı
    const books = await Book.find()
      .sort({ createdAt: -1 }) // Verileiri en yeniden eskiye sıralar
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage"); // Kitapları al ve kullanıcı bilgilerini doldur

    // Toplam kitap sayısını al
    const totalBooks = await Book.countDocuments();
    res.send({
      books,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit), // Toplam sayfa sayısını hesapla
      totalBooks, // Toplam kitap sayısını da döndür
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Kitap Önerileri alma

router.get("/user", protectRoute, async (req, res) => {
  try {
    const userId = req.user._id; // İstek yapan kullanıcının kimliğini al
    const books = await Book.find({ user: userId }) // Kullanıcının kitaplarını al
      .sort({ createdAt: -1 }); // En yeni kitapları en üstte göster // Kullanıcı bilgilerini doldur
    res.status(200).json(books); // Kitapları döndür
  } catch (error) {
    console.error("Error fetching user books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Kitabı Bul ve Sil
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // Kitabın sahibi ile istek yapan kullanıcının kimliğini karşılaştır
    if (book.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this book" });
    }

    // Cloudinaryden resmi de sil
    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0]; // Resim URL'sinden public ID'yi al
        await cloudinary.uploader.destroy(publicId); // Cloudinary'den resmi sil
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return res.status(500).json({ message: "Failed to delete image" });
      }
    }

    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// // Kitap Güncelleme
// router.put("/:id", protectRoute, async (req, res) => {
//   try {

//   } catch (error) {
//     console.error("Error updating book:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

export default router;
