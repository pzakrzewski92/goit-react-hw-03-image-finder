import React, { Component } from "react";
import PropTypes from "prop-types";

import css from "./Searchbar.module.css";

class Searchbar extends Component {
    state = {
        query: "",
    };

    handleChange = (e) => {
        this.setState({ query: e.target.value.toLowerCase() });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.query.trim() === "") {
            alert("Enter your search query");
            return;
        }

        this.props.onSubmit(this.state.query);
    };

    render() {
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.query}
                    />
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>
                            Search
                        </span>
                    </button>
                </form>
            </header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;