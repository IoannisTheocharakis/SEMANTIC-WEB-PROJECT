/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

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
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import models.BasicStatistics;
import models.CommonClass;
import models.CommonProperty;

/**
 *
 * @author Theo
 */
public class QueriesForWebApp {

    String retrieveBasicStatistics = "select * where {?s ?p ?o . filter(!isBlank(?o))}";

    String retrieveProperties = "SELECT ?prop ?triples ?count WHERE { { SELECT (COUNT(*) AS ?count) WHERE { ?s void:propertyPartition ?o . ?o void:property ?prop . ?o void:triples ?triples } } ?s void:propertyPartition ?o . ?o void:property ?prop . ?o void:triples ?triples } ORDER BY DESC(xsd:integer(?triples)) limit <limit> offset <offset>";
    String retrieveCRMProperties = "SELECT ?prop ?triples ?count WHERE { { SELECT (COUNT(*) AS ?count) where {?s void:propertyPartition ?o . ?o void:property ?prop . ?o void:triples ?triples .filter(regex(?prop,'crm')) } } ?s void:propertyPartition ?o . ?o void:property ?prop . ?o void:triples ?triples .filter(regex(?prop,'crm')) } order by desc (xsd:Integer(?triples)) limit <limit> offset <offset>";
    //String retrieveProperties = "select ?prop ?triples where {?s void:propertyPartition ?o . ?o void:property ?prop . ?o void:triples ?triples} order by desc (xsd:Integer(?triples)) limit <limit> offset <offset>";
    //String retrieveCRMProperties = "select ?prop ?triples where {?s void:propertyPartition ?o . ?o void:property ?prop . ?o void:triples ?triples .filter(regex(?prop,'crm'))} order by desc (xsd:Integer(?triples)) limit <limit> offset <offset>";

    String retrieveClasses = "select ?class ?triples ?count { { SELECT (COUNT(*) AS ?count) where {?s void:classPartition ?o . ?o void:class ?class . ?o void:triples ?triples } } ?s void:classPartition ?o . ?o void:class ?class . ?o void:triples ?triples} order by desc (xsd:Integer(?triples)) limit <limit> offset <offset>";
    String retrieveCRMClasses = "select ?class ?triples ?count { { SELECT (COUNT(*) AS ?count) where {?s void:classPartition ?o . ?o void:class ?class . ?o void:triples ?triples .filter(regex(?class,'crm'))}} ?s void:classPartition ?o . ?o void:class ?class . ?o void:triples ?triples .filter(regex(?class,'crm'))} order by desc (xsd:Integer(?triples)) limit <limit> offset <offset>";
    //String retrieveClasses = "select ?class ?triples where {?s void:classPartition ?o . ?o void:class ?class . ?o void:triples ?triples} order by desc (xsd:Integer(?triples))";
    //String retrieveCRMClasses = "select ?class ?triples where {?s void:classPartition ?o . ?o void:class ?class . ?o void:triples ?triples .filter(regex(?class,'crm'))} order by desc (xsd:Integer(?triples))";

    String retrieveCommonProperties = "select ?prop ?count where {  { SELECT (COUNT(*) AS ?count) WHERE { ?s void:propertyPartition ?o . ?o void:property ?prop . ?s2 void:propertyPartition ?o2 . ?o2 void:property ?prop } } ?s void:propertyPartition ?o . ?o void:property ?prop . ?s2 void:propertyPartition ?o2 . ?o2 void:property ?prop } limit <limit> offset <offset>";
    String retrieveCommonCRMProperties = "select ?prop ?count where { { SELECT (COUNT(*) AS ?count) WHERE { ?s void:propertyPartition ?o . ?o void:property ?prop . ?s2 void:propertyPartition ?o2 . ?o2 void:property ?prop .filter(regex(?prop,'crm'))} }  ?s void:propertyPartition ?o . ?o void:property ?prop . ?s2 void:propertyPartition ?o2 . ?o2 void:property ?prop .filter(regex(?prop,'crm'))} limit <limit> offset <offset>";
    //String retrieveCommonProperties = "select ?prop where {?s void:propertyPartition ?o . ?o void:property ?prop . ?s2 void:propertyPartition ?o2 . ?o2 void:property ?prop}";
    //String retrieveCommonCRMProperties = "select ?prop where {?s void:propertyPartition ?o . ?o void:property ?prop . ?s2 void:propertyPartition ?o2 . ?o2 void:property ?prop .filter(regex(?prop,'crm'))}";

    String retrieveCommonClasses = "select ?class ?count where {  { SELECT (COUNT(*) AS ?count) WHERE { ?s void:classPartition ?o . ?o void:class ?class . ?s2 void:classPartition ?o2 . ?o2 void:class ?class } } ?s void:classPartition ?o . ?o void:class ?class . ?s2 void:classPartition ?o2 . ?o2 void:class ?class}  limit <limit> offset <offset>";
    String retrieveCommonCRMClasses = "select ?class ?count where {  { SELECT (COUNT(*) AS ?count) WHERE { ?s void:classPartition ?o . ?o void:class ?class . ?s2 void:classPartition ?o2 . ?o2 void:class ?class .filter(regex(?class,'crm'))} } ?s void:classPartition ?o . ?o void:class ?class . ?s2 void:classPartition ?o2 . ?o2 void:class ?class .filter(regex(?class,'crm'))}  limit <limit> offset <offset>";
    //String retrieveCommonClasses = "select ?class where {?s void:classPartition ?o . ?o void:class ?class . ?s2 void:classPartition ?o2 . ?o2 void:class ?class}";
    //String retrieveCommonCRMClasses = "select ?class where {?s void:classPartition ?o . ?o void:class ?class . ?s2 void:classPartition ?o2 . ?o2 void:class ?class .filter(regex(?class,'crm'))}";

    String retrieveDatasetsAndTheirTitle = "select ?s ?title ?triples where {?s a void:Dataset . ?s <http://purl.org/dc/terms/title> ?title . ?s void:triples ?triples}";
    String endpoint = "http://83.212.97.78:8890/sparql";

    public List<Dataset> retrieveAllDatasetsAndTheirTitle() throws UnsupportedEncodingException, MalformedURLException, IOException {
        String query = retrieveDatasetsAndTheirTitle;
        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);

        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);

        String input;
        List<Dataset> datasets = new ArrayList<>();
        int arrCounter = 0;
        int datasetsCounter = 0;
        String[] arrOfStrings = new String[3];
        while ((input = in.readLine()) != null) {
            arrOfStrings = input.split("\t");
            for (arrCounter = 0; arrCounter < 3; arrCounter++) {
                arrOfStrings[arrCounter] = arrOfStrings[arrCounter].substring(1, arrOfStrings[arrCounter].length() - 1);
            }
            Dataset dat = new Dataset();
            dat.setDatasetStandarInfo(datasetsCounter, arrOfStrings[0], arrOfStrings[1], arrOfStrings[2]);
            datasets.add(dat);
            //my ID;
            datasetsCounter++;
        }
        in.close();
        isr.close();
        is.close();
        return datasets;
    }

    public BasicStatistics getBasicStatistics(String dataset) throws UnsupportedEncodingException, MalformedURLException, IOException {
        String query = retrieveBasicStatistics.replace("?s", "<" + dataset + ">");
        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);

        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);

        String input;

        String resultsString = "";
        BasicStatistics basicStatistics;
        int arrCounter = 0;
        int basicStatisticsCounter = 0;
        String[] arrOfStrings = new String[2];
        String[] basicStatisticsOnString = new String[12];
        while ((input = in.readLine()) != null) {
            System.out.println(input);

            if (basicStatisticsCounter <= 1) {
                basicStatisticsCounter++;
                continue;
            }
            arrOfStrings = input.split("\t");
            for (arrCounter = 0; arrCounter < 2; arrCounter++) {
                arrOfStrings[arrCounter] = arrOfStrings[arrCounter].substring(1, arrOfStrings[arrCounter].length() - 1);
            }
            basicStatisticsOnString[basicStatisticsCounter - 2] = arrOfStrings[1];
            basicStatisticsCounter++;
        }
        BasicStatistics basicStatisticsClass = new BasicStatistics(Integer.parseInt(basicStatisticsOnString[0]), Integer.parseInt(basicStatisticsOnString[1]), basicStatisticsOnString[2], Integer.parseInt(basicStatisticsOnString[3]), Integer.parseInt(basicStatisticsOnString[4]), basicStatisticsOnString[5], Integer.parseInt(basicStatisticsOnString[6]),
                Double.parseDouble(basicStatisticsOnString[7]), Integer.parseInt(basicStatisticsOnString[8]), Double.parseDouble(basicStatisticsOnString[9]), Integer.parseInt(basicStatisticsOnString[10]), Integer.parseInt(basicStatisticsOnString[11]));
        in.close();
        isr.close();
        is.close();
        return basicStatisticsClass;
    }

    public List<Property> getAllProperties(String dataset, boolean onlyCIDOC, int limit, int page) throws UnsupportedEncodingException, MalformedURLException, IOException {

        String query = "";
        if (!onlyCIDOC) {
            query = this.retrieveProperties.replace("?s", "<" + dataset + ">");
        } else {
            query = this.retrieveCRMProperties.replace("?s", "<" + dataset + ">");
        }
        page = 10 * page;
        query = query.replace("<limit>", Integer.toString(limit));
        query = query.replace("<offset>", Integer.toString(page));

        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);

        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);

        String input;
        List<Property> properties = new ArrayList<>();
        int arrCounter = 0;
        int propertiesCounter = 0;
        String[] arrOfStrings = new String[3];
        while ((input = in.readLine()) != null) {
            if (propertiesCounter == 0) {
                propertiesCounter++;
                continue;
            }
            arrOfStrings = input.split("\t");
            for (arrCounter = 0; arrCounter < 2; arrCounter++) {
                arrOfStrings[arrCounter] = arrOfStrings[arrCounter].substring(1, arrOfStrings[arrCounter].length() - 1);
            }
            Property prop = new Property(propertiesCounter, arrOfStrings[0], Integer.parseInt(arrOfStrings[1]), Integer.parseInt(arrOfStrings[2]));
            properties.add(prop);
            propertiesCounter++;
        }
        in.close();
        isr.close();
        is.close();
        return properties;
    }

    public List<RDFClass> getAllClasses(String dataset, boolean onlyCIDOC, int limit, int page) throws UnsupportedEncodingException, MalformedURLException, IOException {

        String query = "";
        if (!onlyCIDOC) {
            query = this.retrieveClasses.replace("?s", "<" + dataset + ">");
        } else {
            query = this.retrieveCRMClasses.replace("?s", "<" + dataset + ">");
        }

        page = 10 * page;
        query = query.replace("<limit>", Integer.toString(limit));
        query = query.replace("<offset>", Integer.toString(page));

        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);

        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);

        String input;
        List<RDFClass> rdfClasses = new ArrayList<>();
        int arrCounter = 0;
        int rdfClassesCounter = 0;
        String[] arrOfStrings = new String[3];
        while ((input = in.readLine()) != null) {
            if (rdfClassesCounter == 0) {
                rdfClassesCounter++;
                continue;
            }
            arrOfStrings = input.split("\t");
            for (arrCounter = 0; arrCounter < 2; arrCounter++) {
                arrOfStrings[arrCounter] = arrOfStrings[arrCounter].substring(1, arrOfStrings[arrCounter].length() - 1);
            }
            RDFClass rdfClass = new RDFClass(rdfClassesCounter, arrOfStrings[0], Integer.parseInt(arrOfStrings[1]), Integer.parseInt(arrOfStrings[2]));
            rdfClasses.add(rdfClass);
            rdfClassesCounter++;
        }
        in.close();
        isr.close();
        is.close();
        return rdfClasses;
    }

    public List<CommonProperty> getCommonProperties(String dataset1, String dataset2, boolean onlyCIDOC, int limit, int page) throws UnsupportedEncodingException, MalformedURLException, IOException {
        String query = "";
        if (!onlyCIDOC) {
            query = this.retrieveCommonProperties.replace("?s2", "<" + dataset2 + ">").replace("?s", "<" + dataset1 + ">");
        } else {
            query = this.retrieveCommonCRMProperties.replace("?s2", "<" + dataset2 + ">").replace("?s", "<" + dataset1 + ">");
        }
        page = 10 * page;
        query = query.replace("<limit>", Integer.toString(limit));
        query = query.replace("<offset>", Integer.toString(page));
        System.out.println(query);

        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);

        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);

        String input;
        List<CommonProperty> commonProperties = new ArrayList<>();
        int arrCounter = 0;
        int commonPropertiesCounter = 0;
        String[] arrOfStrings = new String[2];
        while ((input = in.readLine()) != null) {
            System.out.println(input);

            if (commonPropertiesCounter == 0) {
                commonPropertiesCounter++;
                continue;
            }
            arrOfStrings = input.split("\t");
            arrOfStrings[0] = arrOfStrings[0].substring(1, arrOfStrings[arrCounter].length() - 1);

            System.out.println(arrOfStrings[0]);
            System.out.println(arrOfStrings[1]);

            CommonProperty commonProperty = new CommonProperty(arrOfStrings[0], Integer.parseInt(arrOfStrings[1]));
            commonProperties.add(commonProperty);
            commonPropertiesCounter++;
        }
        in.close();
        isr.close();
        is.close();
        return commonProperties;
    }

    public List<CommonClass> getCommonClasses(String dataset1, String dataset2, boolean onlyCIDOC, int limit, int page) throws UnsupportedEncodingException, MalformedURLException, IOException {
        String query = "";
        if (!onlyCIDOC) {
            query = this.retrieveCommonClasses.replace("?s2", "<" + dataset2 + ">").replace("?s", "<" + dataset1 + ">");
        } else {
            query = this.retrieveCommonCRMClasses.replace("?s2", "<" + dataset2 + ">").replace("?s", "<" + dataset1 + ">");
        }
        page = 10 * page;
        query = query.replace("<limit>", Integer.toString(limit));
        query = query.replace("<offset>", Integer.toString(page));
        System.out.println(query);
        String sparqlQueryURL = endpoint + "?query=" + URLEncoder.encode(query, "utf8");
        URL url = new URL(sparqlQueryURL);
        URLConnection con = url.openConnection();
        String type = "text/tab-separated-values";
        con.setRequestProperty("ACCEPT", type);

        InputStream is = con.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf8");
        BufferedReader in = new BufferedReader(isr);

        String input;
        List<CommonClass> commonClasses = new ArrayList<>();
        int arrCounter = 0;
        int commonClassesCounter = 0;
        String[] arrOfStrings = new String[2];
        int count = 0;
        while ((input = in.readLine()) != null) {
            System.out.println(input);

            if (commonClassesCounter == 0) {
                commonClassesCounter++;
                continue;
            }
            arrOfStrings = input.split("\t");
            arrOfStrings[0] = arrOfStrings[0].substring(1, arrOfStrings[arrCounter].length() - 1);

            System.out.println(arrOfStrings[0]);
            System.out.println(arrOfStrings[1]);

            CommonClass commonClass = new CommonClass(arrOfStrings[0], Integer.parseInt(arrOfStrings[1]));
            commonClasses.add(commonClass);
            commonClassesCounter++;
        }
        in.close();
        isr.close();
        is.close();
        return commonClasses;
    }

}
/*
SELECT ?prop ?triples ?count
WHERE {
  {
    SELECT (COUNT(*) AS ?count)
    WHERE {
      <http://ldf.fi/ww1lod/sparql> void:propertyPartition ?o .
        ?o void:property ?prop .
        ?o void:triples ?triples
    }
  }
  <http://ldf.fi/ww1lod/sparql> void:propertyPartition ?o .
  ?o void:property ?prop .
  ?o void:triples ?triples
}
ORDER BY DESC(xsd:integer(?triples))

 */
