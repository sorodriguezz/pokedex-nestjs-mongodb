import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async excuteSeed() {
    await this.pokemonModel.deleteMany({}); // DELETE * FROM POKEMON

    const data = await this.http.get<PokeResponse>(
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
