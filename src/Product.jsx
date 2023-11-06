import { closestCenter, DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { BiImage } from 'react-icons/bi';
import 'react-responsive-modal/styles.css';
import DragProduct from './Component/DragProduct';
import { data } from './data';
import './Product.css';
const Product = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [products, setProducts] = useState(data);

  // drag and drop image function
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setProducts((products) => {
      const oldIndex = products.findIndex(
        (product) => product.id === active.id
      );
      const newIndex = products.findIndex((product) => product.id === over.id);
      return arrayMove(products, oldIndex, newIndex);
    });
  };

  // select image function
  function toggleImageSelection(id) {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.some((field) => field == id)) {
        return prevSelectedItems.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  }

  // delete selected image function
  function deleteSelectedImages() {
    const updatedItems = products.filter(
      (item) => !selectedItems.some((field) => field == item.id)
    );
    setProducts(updatedItems);
    setSelectedItems([]);
  }

  // add new image function
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const base64String = reader.result;

      setProducts([
        ...products,
        {
          id: products.length + 1,
          src: base64String,
        },
      ]);
    };

    reader.readAsDataURL(file);
  };
  return (
    <main className="bg-[#f1f3f4] h-screen p-[10px]">
      <section className="products w-full md:w-[70%] mx-auto rounded-[10px] md:rounded-[20px] lg:rounded-[30px] bg-[#ffffff]">
        {selectedItems.length > 0 ? (
          <div className="flex flex-col md:flex-row justify-between px-[10px] md:px-[20px] py-[10px] md:py-[20px] border-b-[1.7px] border-solid border-[#eae9e9]">
            <div className="mb-[10px] md:mb-0">
              <div className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked="true"
                  name=""
                  id=""
                  className="mr-[5px]"
                />
                <h1 className="font-semibold">
                  {selectedItems?.length} File Selected
                </h1>
              </div>
            </div>
            <div>
              <button
                onClick={deleteSelectedImages}
                className="text-[red] hover:underline"
              >
                {selectedItems?.length > 1 ? 'Delete files' : 'Delete file'}
              </button>
            </div>
          </div>
        ) : (
          <div className="px-[10px] md:px-[20px]  py-[10px] md:py-[20px] border-b-[1.7px] border-solid border-[#eae9e9]">
            <div className="cursor-pointer">
              <h1 className="text-[#0F2121] text-xl font-inter font-semibold leading-6">
                Gallery
              </h1>
            </div>
          </div>
        )}

        <div className="p-[10px] md:p-[20px]">
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={products}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[10px]">
                {products.map((product, i) => (
                  <div
                    key={i}
                    className={`imageContainer ${
                      i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
                  >
                    <DragProduct product={product} />
                    <>
                      {selectedItems.some((field) => field == product.id) ? (
                        <div className="checkbox1 ">
                          <input
                            onChange={() => toggleImageSelection(product.id)}
                            checked={selectedItems.some(
                              (field) => field == product.id
                            )}
                            type="checkbox"
                            name=""
                            id=""
                            className="w-5 h-5"
                          />
                        </div>
                      ) : (
                        <div className="checkbox ">
                          <input
                            onChange={() => toggleImageSelection(product.id)}
                            checked={selectedItems.some(
                              (field) => field == product.id
                            )}
                            type="checkbox"
                            name=""
                            id=""
                            className="w-5 h-5"
                          />
                        </div>
                      )}
                    </>
                  </div>
                ))}

                <div
                  // onClick={onOpenModal}
                  className="rounded border-[2px] border-dashed p-[10px] md:p-[20px] flex justify-center items-center cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="relative w-[150px] h-[90px] mt-1">
                      <label
                        htmlFor="imageInput"
                        className="block w-[150px] h-[90px] rounded-lg cursor-pointer"
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <>
                            <BiImage
                              className="mx-auto w-10"
                              style={{ width: '40px', height: '40px' }}
                              alt="File Picker"
                            />
                            <span className="mt-2 text-gray-400">
                              Select File
                            </span>
                          </>
                        </div>
                        <input
                          id="imageInput"
                          type="file"
                          required={true}
                          accept="image/*"
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          multiple
                          onChange={(e) => {
                            handleFileChange(e);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </section>
    </main>
  );
};
export default Product;
