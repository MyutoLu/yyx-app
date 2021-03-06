import React, { SFC, useState } from "react";
import { connect } from "react-redux";
import { IYyxState } from "../../store";
import { ShardSelectors } from "../../modules/shard";
import { IHeroBookShard } from "../../interfaces";
import { Rarity } from "../Common/Rarity";

const Render: SFC<{
  items: IHeroBookShard[] | null;
}> = props => {
  if (!props.items) {
    return null;
  }

  return (
    <>
      <table className="bp3-html-table bp3-html-table-striped">
        <thead>
          <tr>
            <th>稀有度</th>
            <th>式神</th>
            <th>碎片</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map(
            i =>
              i.hero_data && (
                <tr key={i.hero_id}>
                  <td>
                    <Rarity rarity={i.hero_data.rarity} />
                  </td>
                  <td>{i.hero_data.name}</td>
                  <td>
                    {i.shards} / {i.book_max_shards}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
  );
};

export const ShardPage = connect((state: IYyxState) => ({
  items: ShardSelectors.selectSorted(state)
}))(Render);
