import React from "react";

function NewsDetailsModal({ show, onHide, news }) {
    if (!show || !news) return null;

    return (
        <>
            <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">{news.title}</h5>
                            <button type="button" className="close" onClick={onHide} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            {news.image && (
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="img-fluid mb-3"
                                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                />
                            )}
                            <p>{news.text}</p>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger mx-auto" onClick={onHide}>
                                Volver al Listado de Noticias
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default NewsDetailsModal;
