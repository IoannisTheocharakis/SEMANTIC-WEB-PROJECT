/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package models;

/**
 *
 * @author Theo
 */
public class MostFrequentResponse {

    public String propORclass;
    public int triples;
    public int requestSize;

    public MostFrequentResponse(String propORclass, int triples, int requestSize) {
        this.propORclass = propORclass;
        this.triples = triples;
        this.requestSize = requestSize;
    }
}
