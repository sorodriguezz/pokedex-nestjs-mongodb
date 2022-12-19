import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios; //dependecia de axios

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async excuteSeed() {
    await this.pokemonModel.deleteMany({}); // DELETE * FROM POKEMON

    const { data } = await this.axios.get<PokeResponse>(
      'http://pokeapi.co/api/v2/pokemon?limit=650',
    );

    // const insertPromisesArray = [];
    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2]; // penultima posicion

      // const pokemon = await this.pokemonModel.create({ name, no });

      // insertPromisesArray.push(this.pokemonModel.create({ name, no }));

      // this.pokemonModel.create({ name, no }); //no es apropiado poque depende del foreach
      pokemonToInsert.push({ name, no });
    });

    // await Promise.all(insertPromisesArray); // con promesas
    this.pokemonModel.insertMany(pokemonToInsert); // con insertMany

    return 'Seed Executed';
  }
}
