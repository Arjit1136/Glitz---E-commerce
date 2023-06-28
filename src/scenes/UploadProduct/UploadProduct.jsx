import React, { useState } from 'react'

const ProductForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [inStock, setInStock] = useState(0)
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setImages(files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('inStock', inStock)
      formData.append('brand', brand)
      formData.append('category', category)

      images.forEach((image, index) => {
        formData.append('files', image)
      })

      await fetch('http://localhost:3001/products/', {
        method: 'POST',
        body: formData,
      })

      // Clear form fields and images after successful submission
      setName('')
      setDescription('')
      setPrice(0)
      setInStock(0)
      setBrand('')
      setCategory('')
      setImages([])

      setLoading(false)
      alert('Product uploaded successfully!')
    } catch (error) {
      setLoading(false)
      alert('Failed to upload the product.')
      console.error(error)
    }
  }

  return (
    <div className="product-form mx-auto max-w-md bg-white shadow-md rounded px-8 py-6">
      <h2 className="text-2xl mb-4">Upload Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price:
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="inStock"
            className="block text-sm font-medium text-gray-700"
          >
            In Stock:
          </label>
          <input
            id="inStock"
            type="number"
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Brand:
          </label>
          <input
            id="brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category:
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Images:
          </label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            required
            className="mt-1"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  )
}

export default ProductForm
