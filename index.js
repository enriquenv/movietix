const express = require("express");
const app = express();

const axios = require("axios");

require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.redirect("/all/1");
});

app.get("/all/:page", function (req, res) {
    axios
        .get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=${req.params.page}`
        )
        .then(function (response) {
            // handle success
            // console.log(response.data.results);
            // console.log(response.data.results.length);
            res.render("index.ejs", {
                page: Number(req.params.page),
                movies: response.data.results,
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

    // console.log(req.params.page);
});

app.get("/detail/:id", function (req, res) {
    axios
        .get(
            `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US`
        )
        .then(function (response) {
            res.render("detail.ejs", {
                detail: response.data,
            });
            // console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.get("/search", function (req, res) {
    axios
        .get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&page=1&query=${req.query.search}`
        )
        .then(function (response) {
            res.render("search.ejs", {
                search: req.query.search,
                page: Number(req.params.page),
                movies: response.data.results,
            });
            // console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    // console.log("req", req);
    // console.log("req.query", req.query);
    // console.log("req.query.search", req.query.search);
    // res.render("search.ejs", { search: req.query.search });
});

app.get("/category/:cat/:page", function (req, res) {
    axios
        .get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${req.params.cat}&page=${req.params.page}`
        )
        .then(function (response) {
            // handle success
            // console.log(response.data.results);
            // console.log(response.data.results.length);
            res.render("category.ejs", {
                page: Number(req.params.page),
                cat: Number(req.params.cat),
                movies: response.data.results,
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

    // console.log(req.params.page);
});

app.listen(3000, () => {
    console.log("listening at http://localhost:3000");
});
