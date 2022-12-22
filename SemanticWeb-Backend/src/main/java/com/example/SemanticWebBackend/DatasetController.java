/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.SemanticWebBackend;

import classes.Dataset;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Theo
 */
@RestController
@CrossOrigin
public class DatasetController {
    static List<Dataset> datasets = new ArrayList<>();

    public DatasetController() {
        if (datasets.isEmpty()) {
            Dataset dataset0 = new Dataset("FirstDatabase", "http://ldf.fi/ww1lod/sparql", "First Database", "Giannhs Theocharakis", 1000, 1000, 1000);
            Dataset dataset1 = new Dataset("SecondDatabase", "http", "Second Database", "Giannhs Theocharakis", 1200, 1300, 1400);
            datasets.add(dataset0);
            datasets.add(dataset1);
        }
    }

    @GetMapping("/datasets")
    public List<Dataset> getAllDatasets() {
        return datasets;
    }

    @PostMapping("/newDataset")
    public Dataset addDataset(@RequestBody String newdataset) {
        System.out.println(newdataset);
        Gson gson = new Gson();
        Dataset newDat = gson.fromJson(newdataset, Dataset.class);
        System.out.println(newDat);
        for (Dataset dataset : datasets) {
            if (dataset.getDatasetName().equals(newDat.datasetName)) {
                System.out.println("Error: Dataset Name Exist");
                return null;
            }
        }
        datasets.add(newDat);
        return newDat;
    }

    @GetMapping("/URLdatasets")
    public String getDatabaseRequest() throws UnsupportedEncodingException, MalformedURLException, IOException {
        String endpoint = "http://ldf.fi/ww1lod/sparql";
        //https://code.google.com/archive/p/void-impl/wikis/SPARQLQueriesForStatistics.wiki
        String query = "SELECT ?class (COUNT(?s) AS ?count) { ?s a ?class } GROUP BY ?class ORDER BY ?count";
        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);
        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);
        String inputToString = "";
        String input;
        String resultsString = "";
        int count = 0;
        System.out.println("HERE");

        while ((input = in.readLine()) != null) {
            inputToString += input;
            inputToString += "\n";
        }
        in.close();
        isr.close();
        is.close();
        System.out.println("THERE");
        System.out.println(inputToString);
        return inputToString;
    }

}
