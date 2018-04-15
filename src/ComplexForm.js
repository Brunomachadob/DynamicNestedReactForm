import React, { Component } from "react";
import update from "immutability-helper";

export default class ComplexForm extends Component {
  state = {
    config: {
      nome: "Teste",
      temCabecalho: true,
      colunas: [
        { nome: "A", descr: "ColunaA" },
        { nome: "B", descr: "ColunaB" }
      ]
    }
  };

  updateState = updateInfo => {
    this.setState(update(this.state, updateInfo), () => {
      console.log(this.state);
    });
  };

  buildUpdateInfo = (path, value, operator) => {
    let obj = {};
    let currObj = obj;

    path.split(".").forEach(function(name) {
      currObj = currObj[name] = {};
    });

    currObj[operator || "$set"] = value;

    return obj;
  };

  newColumn = () => {
    this.updateState(
      this.buildUpdateInfo(
        "config.colunas",
        [
          {
            nome: "Nova",
            descr: "Nova coluna"
          }
        ],
        "$push"
      )
    );
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.updateState(this.buildUpdateInfo(name, value));
  };

  render() {
    let { config } = this.state;
    return (
      <form noValidate>
        <label>Nome: </label>
        <input
          name="config.nome"
          value={config.nome}
          onChange={this.handleInputChange}
        />
        <br />
        <label>Tem cabeçalho: </label>
        <input
          name="config.temCabecalho"
          checked={config.temCabecalho}
          onChange={this.handleInputChange}
          type="checkbox"
        />
        <br />
        <br />
        <div>Colunas</div>
        {config.colunas.map((coluna, index) => {
          return (
            <div key={index}>
              <input
                name={`config.colunas.${index}.nome`}
                value={config.colunas[index].nome}
                onChange={this.handleInputChange}
              />
              <input
                name={`config.colunas.${index}.descr`}
                value={config.colunas[index].descr}
                onChange={this.handleInputChange}
              />
            </div>
          );
        })}
        <button type="button" onClick={this.newColumn}>
          Nova coluna
        </button>
      </form>
    );
  }
}
