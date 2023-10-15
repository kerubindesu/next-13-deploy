"use client"
import { useState } from "react"
import type { Brand } from "@prisma/client"
import { useRouter } from "next/navigation"
import axios from "axios"

type Product = {
    id: number
    title: string
    price: number
    brandId: number
}

const DeleteProduct = ({product}: {product: Product}) => {
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    const handleDelete = async (productId: number) => {
        await axios.delete(`api/products/${productId}`)

        router.refresh()
        setIsOpen(false)
    }

    return (
        <div>
            <button onClick={handleModal} className="btn btn-error btn-sm">Delete</button>

            <div className={isOpen?'modal modal-open':'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are sure to delete{product.title}</h3>
                    <div className="modal-action">
                        <button type="button" onClick={handleModal} className="btn">No</button>
                        <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-primary">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteProduct