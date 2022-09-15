const ReviewForm = ({ errors, setErrors, formData, setFormData, handleSubmit, title, singleError }) => {

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '', message: '' })
  }

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">{title}</h1>
        {/* Population error */}
        { singleError && <p className="text-danger">{singleError}</p>}
        {/* Title */}
        <label htmlFor="Title">Title</label>
        <input type="text" name="Title" placeholder="Title" value={formData.Title} onChange={handleChange} />
        { errors.Title && <p className="text-danger">{errors.Title}</p> }
        {/* Price */}
        <label htmlFor="Price">Price</label>
        <input type="text" name="Price" placeholder="Price" value={formData.Price} onChange={handleChange} />
        { errors.Price && <p className="text-danger">{errors.Price}</p> }
        {/* Description */}
        <label htmlFor="Description">Description</label>
        <textarea name="Description" placeholder="Description" value={formData.Description} onChange={handleChange}></textarea>
        { errors.Description && <p className="text-danger">{errors.Description}</p> }
        {/* Image */}
        <label htmlFor="ImageUrl">ImageUrl</label>
        <input type="text" name="ImageUrl" placeholder="ImageUrl" value={formData.ImageUrl} onChange={handleChange} />
        { errors.ImageUrl && <p className="text-danger">{errors.ImageUrl}</p> }
        {/* Non field Errors */}
        { errors.message && <p className="text-danger">{errors.message}</p> }
        {/* Submit */}
        <input type="submit" value={title} className="submit" />
      </form>
    </div>
  )
}

export default ReviewForm