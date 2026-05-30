const Modal = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 transition duration-200"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition duration-200"
                    >
                        {confirmText}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Modal;