import mongoose from "mongoose";



export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING);

    console.log("Liên kết CSDL thành công!");
  } catch (error) {
    console.error("Lỗi khi kết nối CSDL ", error);
    process.exit(1); // Thoát khỏi quá trình với mã lỗi 
  }
};
