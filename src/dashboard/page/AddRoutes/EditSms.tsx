export default function EditSms() {
  // const heading = "text-[black]  font-semibold text-[14px] mb-2";
  // const input =
  //   "bg-white border border-gray-300 rounded w-full p-2 mb-2 hover:border-blue-400 focus:outline-none";

  return (
    <>
      <div className="Body w-96 h-96 px-6 py-8 flex-col justify-start items-start gap-6 inline-flex">
          <div className="Title self-stretch justify-start items-end gap-6 inline-flex">
            <div className="Title grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
              <div className="Text self-stretch text-zinc-700 text-2xl font-medium font-['Inter'] leading-loose tracking-tight">
                Add Category
              </div>
              <div className="ChevronBreadcrumbs justify-start items-center gap-2 inline-flex">
                <div className="Page text-indigo-500 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                  Dashboard
                </div>
                <div className="ChevronRight w-4 h-4 relative" />
                <div className="Page text-indigo-500 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                  Categories
                </div>
                <div className="ChevronRight w-4 h-4 relative" />
                <div className="Page text-gray-500 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                  Add Category
                </div>
              </div>
            </div>
            <div className="Action justify-start items-start gap-4 flex">
              <div className="GrayButton px-3.5 py-2.5 rounded-lg border border-gray-400 justify-center items-center gap-1 flex">
                <div className="Cross w-5 h-5 relative" />
                <div className="Tertiary text-gray-400 text-sm font-semibold font-['Inter'] leading-tight tracking-tight">
                  Cancel
                </div>
              </div>
              <div className="PrimaryButton px-3.5 py-2.5 bg-indigo-500 rounded-lg justify-center items-center gap-1 flex">
                <div className="Plus w-5 h-5 relative" />
                <div className="Primary text-white text-sm font-semibold font-['Inter'] leading-tight tracking-tight">
                  Add Category
                </div>
              </div>
            </div>
          </div>
          <div className="Form self-stretch h-96 justify-start items-start gap-6 inline-flex">
            <div className="Form w-64 p-6 bg-white rounded-lg shadow border border-zinc-200 flex-col justify-start items-center gap-3.5 inline-flex">
              <div className="Text self-stretch text-zinc-900 text-lg font-medium font-['Inter'] leading-7 tracking-tight">
                Thumbnail
              </div>
              <div className="WithLabelMediaUpload self-stretch h-56 flex-col justify-start items-start gap-1 flex">
                <div className="Label self-stretch justify-start items-start gap-2 inline-flex">
                  <div className="Label grow shrink basis-0 text-gray-600 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                    Photo
                  </div>
                </div>
                <div className="MediaUpload self-stretch h-52 px-3 py-6 bg-gray-50 rounded-lg border border-zinc-200 flex-col justify-center items-center gap-4 flex">
                  <div className="CircleIconBagde p-2 bg-violet-200 rounded-full border-4 border-indigo-50 justify-start items-start gap-2 inline-flex">
                    <div className="Img w-7 h-7 relative" />
                  </div>
                  <div className="DragAndDropImageHereOrClickAddImage self-stretch text-center text-gray-400 text-sm font-normal font-['Inter'] leading-tight tracking-tight">
                    Drag and drop image here, or click add image
                  </div>
                  <div className="PrimaryButton px-3.5 py-2.5 bg-violet-200 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="Secondary text-indigo-500 text-sm font-semibold font-['Inter'] leading-tight tracking-tight">
                      Add Image
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Form grow shrink basis-0 p-6 bg-white rounded-lg shadow border border-zinc-200 flex-col justify-start items-center gap-3.5 inline-flex">
              <div className="Text self-stretch text-zinc-900 text-lg font-medium font-['Inter'] leading-7 tracking-tight">
                General Information
              </div>
              <div className="Body self-stretch h-64 flex-col justify-start items-start gap-3.5 flex">
                <div className="WithLabelTextField self-stretch h-16 flex-col justify-start items-start gap-1 flex">
                  <div className="Label self-stretch justify-start items-start gap-2 inline-flex">
                    <div className="Label grow shrink basis-0 text-gray-600 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      Category Name
                    </div>
                  </div>
                  <div className="TextField self-stretch px-3 py-2 bg-gray-50 rounded-lg border border-zinc-200 justify-start items-center gap-1 inline-flex">
                    <div className="TypingArea grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                      <div className="PlaceholderText text-gray-400 text-sm font-normal font-['Inter'] leading-tight tracking-tight">
                        Type category name here. . .
                      </div>
                    </div>
                  </div>
                </div>
                <div className="WithLabelTextArea self-stretch h-44 flex-col justify-start items-start gap-1 flex">
                  <div className="Label self-stretch justify-start items-start gap-2 inline-flex">
                    <div className="Label grow shrink basis-0 text-gray-600 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                      Description
                    </div>
                  </div>
                  <div className="TextArea self-stretch px-3 py-2 bg-gray-50 rounded-lg border border-zinc-200 justify-start items-center gap-1 inline-flex">
                    <div className="TypingArea grow shrink basis-0 h-36 justify-start items-start gap-2 flex">
                      <div className="PlaceholderText grow shrink basis-0 text-gray-400 text-sm font-normal font-['Inter'] leading-tight tracking-tight">
                        Type category description here. . .
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
