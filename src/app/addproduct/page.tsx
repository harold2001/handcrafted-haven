export default function AddProductPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen pb-80">
      <h1 className="text-3xl font-bold mb-6">Create a New Product</h1>
      <form className="w-full max-w-md bg-[#EFF2F6] shadow-xl rounded-2xl p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Product Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-xl" placeholder="Enter product name" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea className="w-full px-4 py-2 border rounded-xl" placeholder="Enter product description"></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <input type="number" className="w-full px-4 py-2 border rounded-xl" placeholder="Enter price" />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <select className="w-full px-4 py-2 border rounded-xl">
            <option value="">Select a category</option>
            <option value="handmade">Handmade</option>
            <option value="art">Art</option>
            <option value="jewelry">Jewelry</option>
          </select>
        </div>

     
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 ">
          Create Product
        </button>
      </form>
    </section>
  );
}
