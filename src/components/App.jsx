import React, { Component } from "react";

import css from "./App.module.css";

import { fetchImg } from "../services/PixabayApi";
import Loader from "./Loader/Loader";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";

class App extends Component {
    state = {
        query: "",
        page: 1,
        images: [],
        error: null,
        isLoading: false,
        showModal: false,
        largeImageURL: "",
        webformatURL: "",
    };

    onSubmit = (query) => {
        if (query !== this.state.query) {
            this.setState({ images: [], page: 1, query }, () => {
                this.fetchQuery(query);
            });
        }
    };

    fetchQuery = async (valueQuery) => {
        this.setState({ isLoading: true, error: null });
        try {
            const response = await fetchImg(valueQuery, this.state.page);
            this.setState((prevState) => ({
                images: [...prevState.images, ...response],
            }));
        } catch (error) {
            this.setState({ error });
        } finally {
            setTimeout(() => {
                this.setState({ isLoading: false });
            }, 600);
        }
    };

    handleLoadMore = () => {
        this.setState({ page: this.state.page + 1 }, () => {
            this.fetchQuery(this.state.query);
        });
    };

    onShow = (url) => {
        this.setState({ showModal: true, largeImageURL: url });
    };

    onClose = () => {
        this.setState({ showModal: false, largeImageURL: "" });
    };

    render() {
        const { images, isLoading, largeImageURL, showModal } = this.state;
        return (
            <div className={css.App}>
                <Searchbar onSubmit={this.onSubmit} />
                <ImageGallery images={images} onShow={this.onShow} />
                {images.length > 0 && !isLoading ? (
                    <Button onClick={this.handleLoadMore} />
                ) : (
                    ""
                )}
                {isLoading && <Loader />}
                {showModal && (
                    <Modal onClose={this.onClose} image={largeImageURL} />
                )}
            </div>
        );
    }
}

export default App;