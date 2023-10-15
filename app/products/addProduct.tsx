"use client"
import { useState, SyntheticEvent } from "react"
import type { Brand } from "@prisma/client"
import { useRouter } from "next/navigation"
import axios from "axios"

const AddProduct = ({brands}: {brands: Brand[]}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [brand, setBrand] = useState("")

    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await axios.post('api/products', {
            title: title,
            price: Number(price),
            brandId: Number(brand)
        })
        setTitle("")
        setPrice("")
        setBrand("")
        router.refresh()
        setIsOpen(false)
    }

    return (
        <div>
            <button onClick={handleModal} className="btn">Add New</button>

            <div className={isOpen?'modal modal-open':'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                name="title"
                                className="input input-bordered"
                                placeholder="Product Name"
                            />
                        </div>
                        <div className="form-control w-full">
                        <label className="label font-bold">Price</label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                name="Price"
                                className="input input-bordered"
                                placeholder="Price"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="select select-bordered"
                            >
                                <option value="" disabled>Select a Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" onClick={handleModal} className="btn">Close</button>
                            <button type="submit" className="btn">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct