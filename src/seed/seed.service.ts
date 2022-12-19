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
    const { data } = await this.axios.get<PokeResponse>(
      'http://pokeapi.co/api/v2/pokemon?limit=10',
    );

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2]; // penultima posicion

      const pokemon = await this.pokemonModel.create({ name, no });
    });

    return 'Seed Executed';
  }
}
